import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from '@prisma/client';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

describe('ProfilesResolver', () => {
  let resolver: ProfilesResolver;
  let service: ProfilesService;

  const profile: Profile = {
    id: 1,
    bio: 'Happy',
    userId: 1,
  };

  const profiles: Profile[] = [
    {
      id: 1,
      bio: 'Happy',
      userId: 1,
    },
  ];

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProfilesResolver, ProfilesService],
    }).compile();

    resolver = moduleRef.get<ProfilesResolver>(ProfilesResolver);
    service = moduleRef.get<ProfilesService>(ProfilesService);
  });

  describe('create', () => {
    it('should return a profile', async () => {
      const createProfileInput: CreateProfileInput = {
        bio: 'Happy',
        userId: 1,
      };

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
      const updateProfileInput: UpdateProfileInput = {
        bio: 'Soso',
      };
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
