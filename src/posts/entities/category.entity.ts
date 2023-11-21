import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType({ description: 'Category Model' })
export class Category {
  @Field(() => ID, { description: 'Category ID' })
  id: number;

  @Field(() => String, { description: 'Category Name' })
  name: string;

  @Field(() => [Post], { nullable: true, description: 'Category Posts' })
  posts?: [Post] | null;
}
