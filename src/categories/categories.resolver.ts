import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PostsService } from './../posts/posts.service';
import { Post } from './../posts/entities/post.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postsService: PostsService,
  ) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'getCategories' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Category[]> {
    return this.categoriesService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Category, { nullable: true, name: 'getCategoryById' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Category> {
    return this.categoriesService.findOne({ id: id });
  }

  @ResolveField()
  async posts(@Parent() { id }: Category): Promise<Post[]> {
    return this.postsService.findAll({
      where: {
        categories: {
          some: {
            id: id,
          },
        },
      },
    });
  }

  @Mutation(() => Category, { nullable: true, name: 'updateCategory' })
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoriesService.update({
      where: { id: id },
      data: updateCategoryInput,
    });
  }

  @Mutation(() => Category, { nullable: true, name: 'removeCategory' })
  async removeCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<any> {
    return this.categoriesService.remove({ id: id });
  }
}
