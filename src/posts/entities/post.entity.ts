import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';

@ObjectType({ description: 'Post Model' })
export class Post {
  @Field(() => Int, { description: 'Post ID' })
  id: number;

  @Field(() => Date, { description: 'Created Date' })
  createdAt: Date;

  @Field(() => Date, { description: 'Updated Date' })
  updatedAt: Date;

  @Field(() => String, { description: 'Post Title' })
  title: string;

  @Field(() => Boolean, { defaultValue: false, description: 'Post Published' })
  published: boolean;

  @Field(() => Int, { description: 'User ID' })
  userId: number;

  @Field(() => User, { nullable: true, description: 'User Object' })
  user?: User | null;

  @Field(() => [Category], { nullable: true, description: 'Post Categories' })
  categories?: [Category] | null;
}
