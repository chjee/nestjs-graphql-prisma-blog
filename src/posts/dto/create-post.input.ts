import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  title: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  published: boolean;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  user: { connect: { id: number } };
}
