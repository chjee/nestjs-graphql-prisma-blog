import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Profile Model' })
export class Profile {
  @Field(() => ID, { description: 'Profile ID' })
  id: number;

  @Field(() => String, { description: 'User Bio' })
  bio: string;

  @Field(() => Int, { description: 'User ID' })
  userId: number;
}
