import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Profile {
  @Field(() => Int, { description: 'Profile ID' })
  id: number;

  @Field(() => String, { description: 'User Status' })
  bio: string;

  @Field(() => String, { description: 'User ID' })
  userId: string;

  @Field(() => User, { description: 'User Object' })
  user: User;
}
