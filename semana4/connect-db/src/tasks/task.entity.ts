import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ default: false })
    completada: boolean;

    @ManyToOne(() => User, (user) => user.tareas, { eager: true })
    user: User;
}
