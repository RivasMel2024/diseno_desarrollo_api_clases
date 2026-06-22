import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine, MachineStatus } from './machine.entity';
import { CreateMachineDto } from './dto/create-machine.dto';
import { RentalRequest, RentalStatus } from '../rentals/rental-request.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machinesRepository: Repository<Machine>,
    @InjectRepository(RentalRequest)
    private readonly rentalsRepository: Repository<RentalRequest>,
  ) {}

  create(dto: CreateMachineDto): Promise<Machine> {
    const machine = this.machinesRepository.create({
      ...dto,
      status: dto.status ?? MachineStatus.DISPONIBLE,
    });
    return this.machinesRepository.save(machine);
  }

  findAvailable(): Promise<Machine[]> {
    return this.machinesRepository.find({
      where: { status: MachineStatus.DISPONIBLE },
    });
  }

  findById(id: string): Promise<Machine | null> {
    return this.machinesRepository.findOne({ where: { id } });
  }

  async hasActiveReservation(machineId: string): Promise<boolean> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().slice(0, 10);

    const count = await this.rentalsRepository
      .createQueryBuilder('rental')
      .where('rental.machine_id = :machineId', { machineId })
      .andWhere('rental.status IN (:...statuses)', {
        statuses: [RentalStatus.PENDIENTE, RentalStatus.APROBADA],
      })
      .andWhere('rental.end_date >= :today', { today: todayStr })
      .getCount();

    return count > 0;
  }

  /** True si ya hay solicitud Pendiente/Aprobada que se solapa con el rango de fechas. */
  async hasOverlappingReservation(
    machineId: string,
    startDate: string,
    endDate: string,
  ): Promise<boolean> {
    const count = await this.rentalsRepository
      .createQueryBuilder('rental')
      .where('rental.machine_id = :machineId', { machineId })
      .andWhere('rental.status IN (:...statuses)', {
        statuses: [RentalStatus.PENDIENTE, RentalStatus.APROBADA],
      })
      .andWhere('rental.start_date <= :endDate', { endDate })
      .andWhere('rental.end_date >= :startDate', { startDate })
      .getCount();

    return count > 0;
  }

  async remove(id: string): Promise<void> {
    const machine = await this.findById(id);

    if (!machine) {
      throw new NotFoundException('Máquina no encontrada');
    }

    if (await this.hasActiveReservation(id)) {
      throw new ConflictException(
        'No se puede eliminar la máquina porque tiene una reserva activa',
      );
    }

    await this.machinesRepository.remove(machine);
  }
}
