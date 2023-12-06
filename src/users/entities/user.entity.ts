import { ObjectType, Field, Int, GraphQLTimestamp } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profile.entity';
import { Post } from '../../posts/entities/post.entity';

@ObjectType({ description: 'User Model' })
export class User {
  @Field(() => Int, { description: 'User ID' })
  id: number;

  @Field(() => GraphQLTimestamp, { description: 'Created Date' })
  createdAt: Date;

  @Field(() => String, { description: 'User Email' })
  email: string;

  @Field(() => String, { nullable: true, description: 'User Name' })
  name?: string;

  @Field(() => String, { description: 'Password' })
  password: string;

  @Field(() => String, { description: 'User Role' })
  role: string;

  @Field(() => [Post], { nullable: true, description: 'User Posts' })
  posts?: [Post] | null;

  @Field(() => Profile, { nullable: true, description: 'User Profile' })
  profile?: Profile | null;
}
