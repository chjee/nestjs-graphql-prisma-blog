import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { ProfilesService } from '../src/profiles/profiles.service';

describe('ProfilesResolver (e2e)', () => {
  let app: INestApplication;
  const profilesService = {
    create: () => mockProfile,
    findAll: () => [mockProfile, mockProfile],
    findOne: () => mockProfile,
    update: () => mockProfile,
    remove: () => mockProfile,
  };

  const mockProfile = {
    id: 1,
    bio: 'Happy',
    userId: 1,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(ProfilesService)
      .useValue(profilesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('createProfile', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createProfile(createProfileInput: {
              bio: "Happy"
              userId: 1
            }) {
              id
              bio
              userId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { createProfile: profilesService.create() } });
  });

  it('findAll', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            profiles(skip:0, take:2) {
              id
              bio
              userId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { profiles: profilesService.findAll() } });
  });

  it('findOne', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            profile(id: 1) {
              id
              bio
              userId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { profile: profilesService.findOne() } });
  });

  it('updateProfile', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateProfile(id: 1, 
            updateProfileInput: { bio: "Soso" }) {
              id
              bio
              userId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { updateProfile: profilesService.update() } });
  });

  it('removeProfile', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeProfile(id: 1) {
              id
              bio
              userId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { removeProfile: profilesService.remove() } });
  });

  afterAll(async () => {
    await app.close();
  });
});
