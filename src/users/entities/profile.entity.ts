import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  bio: string;

  @Field(() => String)
  userId: string;

  @Field(() => User)
  user: User;
}
