import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  profile,
  profiles,
  createProfileInput,
  updateProfileInput,
} from '../common/constants/jest.constants';

describe('ProfilesService', () => {
  let profilesService: ProfilesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProfilesService],
    }).compile();

    profilesService = moduleRef.get<ProfilesService>(ProfilesService);
  });

  describe('create', () => {
    it('should return a profile', async () => {
      jest
        .spyOn(profilesService, 'create')
        .mockImplementation(async () => profile);
      expect(await profilesService.create(createProfileInput)).toBe(profile);
    });
  });

  describe('findAll', () => {
    it('should return an array of profiles', async () => {
      jest
        .spyOn(profilesService, 'findAll')
        .mockImplementation(async () => profiles);
      expect(await profilesService.findAll({ skip: 0, take: 3 })).toBe(
        profiles,
      );
    });
  });

  describe('findOne', () => {
    it('should return a profile', async () => {
      jest
        .spyOn(profilesService, 'findOne')
        .mockImplementation(async () => profile);
      expect(await profilesService.findOne({ id: 1 })).toBe(profile);
    });
  });

  describe('update', () => {
    it('should return an updated profile', async () => {
      jest
        .spyOn(profilesService, 'update')
        .mockImplementation(async () => profile);
      expect(
        await profilesService.update({
          where: { id: 1 },
          data: updateProfileInput,
        }),
      ).toBe(profile);
    });
  });

  describe('remove', () => {
    it('should return a profile', async () => {
      jest
        .spyOn(profilesService, 'remove')
        .mockImplementation(async () => profile);
      expect(await profilesService.remove({ id: 1 })).toBe(profile);
    });
  });
});
