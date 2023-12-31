import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UsersService } from './../users/users.service';
import { User } from './../users/entities/user.entity';
import { CategoriesService } from './../categories/categories.service';
import { Category } from './../categories/entities/category.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'getPosts' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Post[]> {
    return this.postsService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Post, { nullable: true, name: 'getPostById' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return this.postsService.findOne({ id });
  }

  @ResolveField()
  async user(@Parent() { userId }: Post): Promise<User> {
    return this.usersService.findOne({ id: userId });
  }

  @ResolveField()
  async categories(@Parent() { id }: Post): Promise<Category[]> {
    return this.categoriesService.findAll({
      where: {
        posts: {
          some: {
            id: id,
          },
        },
      },
    });
  }

  @Mutation(() => Post, { nullable: true, name: 'updatePost' })
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    return this.postsService.update({
      where: { id: id },
      data: updatePostInput,
    });
  }

  @Mutation(() => Post, { nullable: true, name: 'removePost' })
  async removePost(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.postsService.remove({ id: id });
  }
}
