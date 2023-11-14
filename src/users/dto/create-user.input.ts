import { InputType, Field } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  @Length(6, 60)
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @Length(4, 60)
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  password: string;

  @Field(() => String)
  @IsEnum(['ADMIN', 'USER'])
  role: $Enums.Role;
}
