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
  let resolver: PostsResolver;
  let service: PostsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PostsResolver, PostsService],
    }).compile();

    resolver = moduleRef.get<PostsResolver>(PostsResolver);
    service = moduleRef.get<PostsService>(PostsService);
  });

  describe('create', () => {
    it('should return a post', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => post);
      expect(await resolver.createPost(createPostInput)).toBe(post);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => posts);
      expect(await resolver.findAll(0, 2)).toBe(posts);
    });
  });

  describe('findOne', () => {
    it('should return a post', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => post);
      expect(await resolver.findOne(1)).toBe(post);
    });
  });

  describe('update', () => {
    it('should return a post', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => post);
      expect(await resolver.updatePost(1, updatePostInput)).toBe(post);
    });
  });

  describe('remove', () => {
    it('should return a post', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => post);
      expect(await resolver.removePost(1)).toBe(post);
    });
  });
});
