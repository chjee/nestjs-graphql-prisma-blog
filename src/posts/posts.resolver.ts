import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

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

  @Query(() => Post, { name: 'getPostById' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return this.postsService.findOne({ id });
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    return this.postsService.update({
      where: { id: id },
      data: updatePostInput,
    });
  }

  @Mutation(() => Post)
  async removePost(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.postsService.remove({ id: id });
  }
}
