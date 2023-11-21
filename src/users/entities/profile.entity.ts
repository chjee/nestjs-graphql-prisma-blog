import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType({ description: 'Profile Model' })
export class Profile {
  @Field(() => ID, { description: 'Profile ID' })
  id: number;

  @Field(() => String, { description: 'User Bio' })
  bio: string;

  @Field(() => String, { description: 'User ID' })
  userId: string;

  @Field(() => User, { description: 'User Object' })
  user: User;
}
