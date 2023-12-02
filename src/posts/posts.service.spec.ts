import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  post,
  posts,
  createPostInput,
  updatePostInput,
} from '../common/constants/jest.constants';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PostsService],
    }).compile();

    postsService = moduleRef.get<PostsService>(PostsService);
  });

  describe('create', () => {
    it('should return a post', async () => {
      jest.spyOn(postsService, 'create').mockImplementation(async () => post);
      expect(await postsService.create(createPostInput)).toBe(post);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      jest.spyOn(postsService, 'findAll').mockImplementation(async () => posts);
      expect(await postsService.findAll({ skip: 0, take: 3 })).toBe(posts);
    });
  });

  describe('findOne', () => {
    it('should return a post', async () => {
      jest.spyOn(postsService, 'findOne').mockImplementation(async () => post);
      expect(await postsService.findOne({ id: 1 })).toBe(post);
    });
  });

  describe('update', () => {
    it('should return a post', async () => {
      jest.spyOn(postsService, 'update').mockImplementation(async () => post);
      expect(
        await postsService.update({ where: { id: 1 }, data: updatePostInput }),
      ).toBe(post);
    });
  });

  describe('remove', () => {
    it('should return a post', async () => {
      jest.spyOn(postsService, 'remove').mockImplementation(async () => post);
      expect(await postsService.remove({ id: 1 })).toBe(post);
    });
  });
});
