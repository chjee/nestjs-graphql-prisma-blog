import { InputType, Field } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  @Length(6, 60)
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @Length(4, 60)
  name: string;

  @Field(() => String)
  @IsString()
  @Length(6, 60)
  password: string;

  @Field(() => String)
  @IsEnum(['ADMIN', 'USER'])
  role: $Enums.Role;
}
