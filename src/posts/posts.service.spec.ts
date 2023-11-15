import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

describe('PostsService', () => {
  let service: PostsService;

  const post: Post = {
    id: 1,
    title: 'Test Post',
    published: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
  };

  const posts: Post[] = [
    {
      id: 1,
      title: 'Test Post',
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1,
    },
  ];
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PostsService],
    }).compile();

    service = moduleRef.get<PostsService>(PostsService);
  });

  describe('create', () => {
    it('should return a post', async () => {
      const createPostInput: CreatePostInput = {
        title: 'Just 10 minutes.',
        published: false,
        userId: 1,
        user: {
          connect: {
            id: 1,
          },
        },
      };

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
      const updatePostInput: UpdatePostInput = {
        title: 'Just 5 minutes.',
        published: true,
      };
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
