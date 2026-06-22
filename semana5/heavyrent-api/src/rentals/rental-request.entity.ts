import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Machine } from '../machines/machine.entity';

export enum RentalStatus {
  PENDIENTE = 'Pendiente',
  APROBADA = 'Aprobada',
  RECHAZADA = 'Rechazada',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

@Entity('rental_requests')
export class RentalRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date' })
  endDate: string;

  @Column({
    type: 'enum',
    enum: RentalStatus,
    default: RentalStatus.PENDIENTE,
  })
  status: RentalStatus;

  @Column({ name: 'total_cost', type: 'decimal', precision: 12, scale: 2 })
  totalCost: number;

  @Column({ name: 'deposit_amount', type: 'decimal', precision: 12, scale: 2 })
  depositAmount: number;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Column({
    name: 'stripe_payment_intent_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  stripePaymentIntentId: string | null;

  @ManyToOne(() => User, (user) => user.rentals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Machine, (machine) => machine.rentals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
