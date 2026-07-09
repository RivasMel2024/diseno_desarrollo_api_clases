import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class ProductFilterInput {
  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field(() => Float, { nullable: true })
  priceMin?: number;

  @Field(() => Float, { nullable: true })
  priceMax?: number;
}
