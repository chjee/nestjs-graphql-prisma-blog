import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  profile,
  profiles,
  createProfileInput,
  updateProfileInput,
} from '../common/constants/jest.constants';

describe('ProfilesResolver', () => {
  let profilesResolver: ProfilesResolver;
  let profilesService: ProfilesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProfilesResolver, ProfilesService],
    }).compile();

    profilesResolver = moduleRef.get<ProfilesResolver>(ProfilesResolver);
    profilesService = moduleRef.get<ProfilesService>(ProfilesService);
  });

  describe('create', () => {
    it('should return a profile', async () => {
      jest
        .spyOn(profilesService, 'create')
        .mockImplementation(async () => profile);
      expect(await profilesResolver.createProfile(createProfileInput)).toBe(
        profile,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of profiles', async () => {
      jest
        .spyOn(profilesService, 'findAll')
        .mockImplementation(async () => profiles);
      expect(await profilesResolver.findAll(0, 2)).toBe(profiles);
    });
  });

  describe('findOne', () => {
    it('should return a profile', async () => {
      jest
        .spyOn(profilesService, 'findOne')
        .mockImplementation(async () => profile);
      expect(await profilesResolver.findOne(1)).toBe(profile);
    });
  });

  describe('update', () => {
    it('should return an updated profile', async () => {
      jest
        .spyOn(profilesService, 'update')
        .mockImplementation(async () => profile);
      expect(await profilesResolver.updateProfile(1, updateProfileInput)).toBe(
        profile,
      );
    });
  });

  describe('remove', () => {
    it('should return a profile', async () => {
      jest
        .spyOn(profilesService, 'remove')
        .mockImplementation(async () => profile);
      expect(await profilesResolver.removeProfile(1)).toBe(profile);
    });
  });
});
