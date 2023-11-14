import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Post], { nullable: true })
  posts?: [Post] | null;
}
