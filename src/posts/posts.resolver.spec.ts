import { Test, TestingModule } from '@nestjs/testing';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './../users/users.service';
import { CategoriesService } from './../categories/categories.service';
import {
  post,
  posts,
  createPostInput,
  updatePostInput,
  user,
  categories,
} from '../common/constants/jest.constants';

describe('PostsResolver', () => {
  let postsResolver: PostsResolver;
  let postsService: PostsService;
  let usersService: UsersService;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        PostsResolver,
        PostsService,
        UsersService,
        CategoriesService,
      ],
    }).compile();

    postsResolver = moduleRef.get<PostsResolver>(PostsResolver);
    postsService = moduleRef.get<PostsService>(PostsService);
    usersService = moduleRef.get<UsersService>(UsersService);
    categoriesService = moduleRef.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should return a post', async () => {
      jest.spyOn(postsService, 'create').mockImplementation(async () => post);
      expect(await postsResolver.createPost(createPostInput)).toBe(post);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      jest.spyOn(postsService, 'findAll').mockImplementation(async () => posts);
      expect(await postsResolver.findAll(0, 2)).toBe(posts);
    });
  });

  describe('findOne', () => {
    it('should return a post', async () => {
      jest.spyOn(postsService, 'findOne').mockImplementation(async () => post);
      expect(await postsResolver.findOne(1)).toBe(post);
    });
  });

  describe('user', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);
      expect(await postsResolver.user(post)).toBe(user);
    });
  });

  describe('categories', () => {
    it('should return an array of categories', async () => {
      jest
        .spyOn(categoriesService, 'findAll')
        .mockImplementation(async () => categories);
      expect(await postsResolver.categories(post)).toBe(categories);
    });
  });

  describe('update', () => {
    it('should return a post', async () => {
      jest.spyOn(postsService, 'update').mockImplementation(async () => post);
      expect(await postsResolver.updatePost(1, updatePostInput)).toBe(post);
    });
  });

  describe('remove', () => {
    it('should return a post', async () => {
      jest.spyOn(postsService, 'remove').mockImplementation(async () => post);
      expect(await postsResolver.removePost(1)).toBe(post);
    });
  });
});
