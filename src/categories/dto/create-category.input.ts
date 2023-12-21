import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType({ description: 'Create Category Input' })
export class CreateCategoryInput {
  @Field(() => String, { description: 'Category name' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  name: string;
}
