import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Categoria } from '../categorias/categoria.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string | null;

  @CreateDateColumn()
  fechaCreacion!: Date;

  @Column({ default: false })
  completada!: boolean;

  @ManyToOne(() => User, (user) => user.tareas, { eager: true })
  user!: User;

  @ManyToOne(() => Categoria, (categoria) => categoria.tareas, { nullable: false })
  categoria!: Categoria;
}