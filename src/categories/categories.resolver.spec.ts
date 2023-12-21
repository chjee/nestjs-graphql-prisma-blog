import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { PrismaService } from './../prisma/prisma.service';
import { PostsService } from './../posts/posts.service';
import {
  categories,
  category,
  createCategoryInput,
  posts,
  updateCategoryInput,
} from './../common/constants/jest.constants';

describe('CategoriesResolver', () => {
  let categoriesResolver: CategoriesResolver;
  let categoriesService: CategoriesService;
  let postsService: PostsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        CategoriesResolver,
        CategoriesService,
        PostsService,
      ],
    }).compile();

    categoriesResolver = moduleRef.get<CategoriesResolver>(CategoriesResolver);
    categoriesService = moduleRef.get<CategoriesService>(CategoriesService);
    postsService = moduleRef.get<PostsService>(PostsService);
  });

  describe('create', () => {
    it('should return a category', async () => {
      jest
        .spyOn(categoriesService, 'create')
        .mockImplementation(async () => category);
      expect(await categoriesResolver.createCategory(createCategoryInput)).toBe(
        category,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      jest
        .spyOn(categoriesService, 'findAll')
        .mockImplementation(async () => categories);
      expect(await categoriesResolver.findAll(0, 2)).toBe(categories);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      jest
        .spyOn(categoriesService, 'findOne')
        .mockImplementation(async () => category);
      expect(await categoriesResolver.findOne(1)).toBe(category);
    });
  });

  describe('posts', () => {
    it('should return an array of posts', async () => {
      jest.spyOn(postsService, 'findAll').mockImplementation(async () => posts);
      expect(await categoriesResolver.posts(category)).toBe(posts);
    });
  });

  describe('update', () => {
    it('should return a category', async () => {
      jest
        .spyOn(categoriesService, 'update')
        .mockImplementation(async () => category);
      expect(
        await categoriesResolver.updateCategory(1, updateCategoryInput),
      ).toBe(category);
    });
  });

  describe('remove', () => {
    it('should return a category', async () => {
      jest
        .spyOn(categoriesService, 'remove')
        .mockImplementation(async () => category);
      expect(await categoriesResolver.removeCategory(1)).toBe(category);
    });
  });
});
