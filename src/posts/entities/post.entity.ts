import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => Boolean, { defaultValue: false })
  published: boolean;

  @Field(() => Int)
  userId: number;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => [Category], { nullable: true })
  categories?: [Category] | null;
}
