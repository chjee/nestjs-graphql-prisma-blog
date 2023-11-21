import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Min } from 'class-validator';

@InputType({ description: 'Create Profile Input' })
export class CreateProfileInput {
  @Field(() => String, { description: 'User Bio' })
  @IsNotEmpty()
  @IsString()
  bio: string;

  @Field(() => Int, { description: 'User ID' })
  @IsNotEmpty()
  @Min(1)
  userId: number;
}
