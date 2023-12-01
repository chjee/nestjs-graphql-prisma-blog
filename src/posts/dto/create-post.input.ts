import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

@InputType({ description: 'Create Post Input' })
export class CreatePostInput {
  @Field(() => String, { description: 'Post Title' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  title: string;

  @Field(() => Boolean, { defaultValue: false, description: 'Post Published' })
  @IsBoolean()
  published: boolean;

  @Field(() => Int, { description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  user: { connect: { id: number } };
}
