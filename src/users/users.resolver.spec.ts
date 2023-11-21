import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from '../profiles/profiles.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  const user: User = {
    id: 1,
    createdAt: new Date(),
    email: 'andrew@prisma.io',
    name: 'Andrew',
    password: 'whoami',
    role: 'ADMIN',
  };

  const users: User[] = [
    {
      id: 1,
      createdAt: new Date(),
      email: 'alice@prisma.io',
      name: 'Alice',
      password: 'whoami',
      role: 'USER',
    },
  ];

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
      const createUserInput: CreateUserInput = {
        email: 'andrew@prisma.io',
        name: 'Andrew',
        password: 'whoami',
        role: 'ADMIN',
      };

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
      const updateUserInput: UpdateUserInput = {
        role: 'USER',
      };

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
