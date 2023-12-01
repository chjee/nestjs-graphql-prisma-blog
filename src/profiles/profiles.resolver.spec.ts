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
  let resolver: ProfilesResolver;
  let service: ProfilesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProfilesResolver, ProfilesService],
    }).compile();

    resolver = moduleRef.get<ProfilesResolver>(ProfilesResolver);
    service = moduleRef.get<ProfilesService>(ProfilesService);
  });

  describe('create', () => {
    it('should return a profile', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => profile);
      expect(await resolver.createProfile(createProfileInput)).toBe(profile);
    });
  });

  describe('findAll', () => {
    it('should return an array of profiles', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => profiles);
      expect(await resolver.findAll(0, 2)).toBe(profiles);
    });
  });

  describe('findOne', () => {
    it('should return a profile', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => profile);
      expect(await resolver.findOne(1)).toBe(profile);
    });
  });

  describe('update', () => {
    it('should return an updated profile', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => profile);
      expect(await resolver.updateProfile(1, updateProfileInput)).toBe(profile);
    });
  });

  describe('remove', () => {
    it('should return a profile', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => profile);
      expect(await resolver.removeProfile(1)).toBe(profile);
    });
  });
});
