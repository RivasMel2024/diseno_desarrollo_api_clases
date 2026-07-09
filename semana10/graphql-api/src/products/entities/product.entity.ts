import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('decimal')
  price: number;

  @Column()
  categoryId: number;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
