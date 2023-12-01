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
  let service: PostsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PostsService],
    }).compile();

    service = moduleRef.get<PostsService>(PostsService);
  });

  describe('create', () => {
    it('should return a post', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => post);
      expect(await service.create(createPostInput)).toBe(post);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => posts);
      expect(await service.findAll({ skip: 0, take: 3 })).toBe(posts);
    });
  });

  describe('findOne', () => {
    it('should return a post', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => post);
      expect(await service.findOne({ id: 1 })).toBe(post);
    });
  });

  describe('update', () => {
    it('should return a post', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => post);
      expect(
        await service.update({ where: { id: 1 }, data: updatePostInput }),
      ).toBe(post);
    });
  });

  describe('remove', () => {
    it('should return a post', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => post);
      expect(await service.remove({ id: 1 })).toBe(post);
    });
  });
});
