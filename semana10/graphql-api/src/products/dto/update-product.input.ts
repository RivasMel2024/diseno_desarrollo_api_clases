import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;
}
