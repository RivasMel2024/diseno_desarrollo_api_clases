import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
@Entity()
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
