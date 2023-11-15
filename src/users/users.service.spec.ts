import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UsersService', () => {
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
      providers: [PrismaService, UsersService],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should return a user', async () => {
      const createUserInput: CreateUserInput = {
        email: 'chjee@naver.com',
        name: 'Andrew',
        password: '123456',
        role: 'ADMIN',
      };
      jest.spyOn(service, 'create').mockImplementation(async () => user);
      expect(await service.create(createUserInput)).toBe(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => users);
      expect(await service.findAll({ skip: 0, take: 3 })).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => user);
      expect(await service.findOne({ id: 1 })).toBe(user);
    });
  });

  describe('update', () => {
    it('should return a user', async () => {
      const updateUserInput: UpdateUserInput = {
        role: 'USER',
      };
      jest.spyOn(service, 'update').mockImplementation(async () => user);
      expect(
        await service.update({ where: { id: 1 }, data: updateUserInput }),
      ).toBe(user);
    });
  });

  describe('remove', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => user);
      expect(await service.remove({ id: 1 })).toBe(user);
    });
  });
});
