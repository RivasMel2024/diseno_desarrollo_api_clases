import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PaymentStatus,
  RentalRequest,
} from './rental-request.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { MachinesService } from '../machines/machines.service';
import { MachineStatus } from '../machines/machine.entity';
import { PaymentsService } from '../payments/payments.service';
import { calculateRentalCosts } from './rental-cost.util';
import { User } from '../users/user.entity';

export interface CreateRentalResponse {
  rental: Omit<RentalRequest, 'user' | 'machine'>;
  totalCost: number;
  depositAmount: number;
  paymentIntentId: string;
  clientSecret: string;
}

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(RentalRequest)
    private readonly rentalsRepository: Repository<RentalRequest>,
    private readonly machinesService: MachinesService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async create(user: User, dto: CreateRentalDto): Promise<CreateRentalResponse> {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      throw new BadRequestException('No se puede alquilar con fechas pasadas');
    }

    if (end < start) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la de inicio',
      );
    }

    const machine = await this.machinesService.findById(dto.machineId);

    if (!machine) {
      throw new NotFoundException('Máquina no encontrada');
    }

    if (machine.status !== MachineStatus.DISPONIBLE) {
      throw new BadRequestException('La máquina no está disponible');
    }

    if (
      await this.machinesService.hasOverlappingReservation(
        dto.machineId,
        dto.startDate,
        dto.endDate,
      )
    ) {
      throw new BadRequestException(
        'La máquina ya tiene una reserva en las fechas seleccionadas',
      );
    }

    const { totalCost, depositAmount } = calculateRentalCosts(
      Number(machine.dailyRate),
      dto.startDate,
      dto.endDate,
    );

    const rental = this.rentalsRepository.create({
      user: { id: user.id },
      machine: { id: dto.machineId },
      startDate: dto.startDate,
      endDate: dto.endDate,
      totalCost,
      depositAmount,
      paymentStatus: PaymentStatus.PENDING,
    });

    const saved = await this.rentalsRepository.save(rental);

    const amountCents = Math.round(depositAmount * 100);
    const { paymentIntentId, clientSecret } =
      await this.paymentsService.createDepositIntent(
        amountCents,
        saved.id,
        user.email,
      );

    saved.stripePaymentIntentId = paymentIntentId;
    const rentalWithPayment = await this.rentalsRepository.save(saved);

    const {
      user: _user,
      machine: _machine,
      ...rentalForResponse
    } = rentalWithPayment;

    return {
      rental: rentalForResponse,
      totalCost,
      depositAmount,
      paymentIntentId,
      clientSecret,
    };
  }

  async confirmPayment(
    userId: string,
    rentalId: string,
    dto: ConfirmPaymentDto,
  ): Promise<RentalRequest> {
    const rental = await this.rentalsRepository.findOne({
      where: { id: rentalId, user: { id: userId } },
    });

    if (!rental) {
      throw new NotFoundException('Solicitud de alquiler no encontrada');
    }

    if (rental.stripePaymentIntentId !== dto.paymentIntentId) {
      throw new BadRequestException(
        'El paymentIntentId no coincide con esta solicitud',
      );
    }

    const status = await this.paymentsService.getPaymentIntentStatus(
      dto.paymentIntentId,
    );

    if (status === 'succeeded') {
      rental.paymentStatus = PaymentStatus.PAID;
    } else if (status === 'canceled') {
      rental.paymentStatus = PaymentStatus.FAILED;
      await this.rentalsRepository.save(rental);
      throw new BadRequestException('El pago fue cancelado');
    } else {
      throw new BadRequestException(
        `El pago aún no está completado (estado: ${status})`,
      );
    }

    return this.rentalsRepository.save(rental);
  }

  findByUser(userId: string): Promise<RentalRequest[]> {
    return this.rentalsRepository.find({
      where: { user: { id: userId } },
      relations: { machine: true },
      order: { createdAt: 'DESC' },
    });
  }
}
