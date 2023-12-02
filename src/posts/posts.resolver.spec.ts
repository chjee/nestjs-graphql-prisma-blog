import { Test, TestingModule } from '@nestjs/testing';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  post,
  posts,
  createPostInput,
  updatePostInput,
} from '../common/constants/jest.constants';

describe('PostsResolver', () => {
  let postsResolver: PostsResolver;
  let postsService: PostsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PostsResolver, PostsService],
    }).compile();

    postsResolver = moduleRef.get<PostsResolver>(PostsResolver);
    postsService = moduleRef.get<PostsService>(PostsService);
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
