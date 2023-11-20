import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType({ description: 'Category Model' })
export class Category {
  @Field(() => Int, { description: 'Category ID' })
  id: number;

  @Field(() => String, { description: 'Category Name' })
  name: string;

  @Field(() => [Post], { nullable: true, description: 'Category Posts' })
  posts?: [Post] | null;
}
