import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import {
  user,
  users,
  createUserInput,
  updateUserInput,
} from '../common/constants/jest.constants';
import { PrismaService } from '../prisma/prisma.service';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from '../profiles/profiles.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UsersResolver,
        UsersService,
        PostsService,
        ProfilesService,
      ],
    }).compile();

    resolver = moduleRef.get<UsersResolver>(UsersResolver);
    service = moduleRef.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => user);
      expect(await resolver.createUser(createUserInput)).toBe(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => users);
      expect(await resolver.findAll(0, 2)).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => user);
      expect(await resolver.findOne(1)).toBe(user);
    });
  });

  describe('update', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => user);
      expect(await resolver.updateUser(1, updateUserInput)).toBe(user);
    });
  });

  describe('remove', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => user);
      expect(await resolver.removeUser(1)).toBe(user);
    });
  });
});
