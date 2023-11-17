import { InputType, Field, PickType, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class SignInInput extends PickType(User, [
  'email',
  'password',
] as const) {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  @Length(6, 60)
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  password: string;
}

@ObjectType()
export class SignInOutput {
  @Field(() => String, { nullable: true, description: 'JWT Token' })
  token?: string;
}
