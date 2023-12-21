import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from './../prisma/prisma.service';
import {
  categories,
  category,
  createCategoryInput,
  updateCategoryInput,
} from './../common/constants/jest.constants';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, CategoriesService],
    }).compile();

    categoriesService = moduleRef.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should return a category', async () => {
      jest
        .spyOn(categoriesService, 'create')
        .mockImplementation(async () => category);
      expect(await categoriesService.create(createCategoryInput)).toBe(
        category,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      jest
        .spyOn(categoriesService, 'findAll')
        .mockImplementation(async () => categories);
      expect(await categoriesService.findAll({ skip: 0, take: 3 })).toBe(
        categories,
      );
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      jest
        .spyOn(categoriesService, 'findOne')
        .mockImplementation(async () => category);
      expect(await categoriesService.findOne({ id: 1 })).toBe(category);
    });
  });

  describe('update', () => {
    it('should return a category', async () => {
      jest
        .spyOn(categoriesService, 'update')
        .mockImplementation(async () => category);
      expect(
        await categoriesService.update({
          where: { id: 1 },
          data: updateCategoryInput,
        }),
      ).toBe(category);
    });
  });

  describe('remove', () => {
    it('should return a category', async () => {
      jest
        .spyOn(categoriesService, 'remove')
        .mockImplementation(async () => category);
      expect(await categoriesService.remove({ id: 1 })).toBe(category);
    });
  });
});
