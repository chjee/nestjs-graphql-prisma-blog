import { InputType, Field, PickType, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class SignInInput extends PickType(User, [
  'email',
  'password',
] as const) {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class SignInOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
