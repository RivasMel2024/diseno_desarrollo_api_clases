import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RentalRequest } from '../rentals/rental-request.entity';

export enum MachineStatus {
  DISPONIBLE = 'Disponible',
  ALQUILADA = 'Alquilada',
  EN_TALLER = 'En taller',
}

@Entity('machines')
export class Machine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({
    type: 'enum',
    enum: MachineStatus,
    default: MachineStatus.DISPONIBLE,
  })
  status: MachineStatus;

  @Column({ name: 'daily_rate', type: 'decimal', precision: 10, scale: 2 })
  dailyRate: number;

  @OneToMany(() => RentalRequest, (rental) => rental.machine)
  rentals: RentalRequest[];
}
