import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from './../src/auth/jwt-auth.guard';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockUser = {
    id: 1,
    name: 'Andrew',
    email: 'andrew@prisma.io',
    role: 'ADMIN',
  };

  const mockPost = {
    id: 1,
    title: 'Just 5 minutes.',
    published: false,
    userId: 1,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.enableShutdownHooks();
    await app.init();
  });

  describe('LogIn User', () => {
    it('POST 200', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              login(signInInput: {
                email: "alice@prisma.io"
                password: "whoami"
              }) {
                token
              }
            }
          `,
        })
        .expect(HttpStatus.OK);
    });
  });

  describe('UsersResolver (e2e)', () => {
    it('createUser', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createUser(createUserInput: {
                email: "andrew@prisma.io"
                name: "Andrew"
                password: "whoami"
                role: "ADMIN"
              }) {
                id
                name
                email
                role
              }
            }
          `,
        })
        .expect(HttpStatus.OK)
        .expect((res) => {
          console.log(res.body);
          mockUser.id = res.body.data.createUser.id;
        });
    });

    it('findAll', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              users(skip:0, take:3) {
                id
                name
                email
                role
              }
            }
          `,
        })
        .expect(HttpStatus.OK);
    });

    it('findOne', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              user(id: ${mockUser.id}) {
                id
                name
                email
                role
              }
            }
          `,
        })
        .expect(HttpStatus.OK);
    });

    it('updateUser', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              updateUser(id: ${mockUser.id}, 
              updateUserInput: { name: "Andy", role: "USER" }) {
                id
                name
                email
                role
              }
            }
          `,
        })
        .expect(HttpStatus.OK);
    });

    it('removeUser', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              removeUser(id: ${mockUser.id}) {
                id
                name
                email
                role
              }
            }
          `,
        })
        .expect(HttpStatus.OK);
    });
  });
  describe('PostsResolver (e2e)', () => {
    it('createPost', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createPost(
                createPostInput: {
                  title: "Just 5 minutes."
                  published: false
                  userId: 1
                }
              ) {
                id
                title
                published
                userId
              }
            }
          `,
        })
        .expect(HttpStatus.OK)
        .expect((res) => {
          mockPost.id = res.body.data.createPost.id;
        });
    });

    it('findAll', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              posts(skip: 0, take: 3) {
                id
                title
                published
                userId
              }
            }
          `,
        })
        .expect(HttpStatus.OK);
    });

    it('findOne', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              post(id: ${mockPost.id}) {
                id
                title
                published
                userId
              }
            }
          `,
        })
        .expect(HttpStatus.OK);
    });

    it('updatePost', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              updatePost(
                id: ${mockPost.id},
                updatePostInput: {
                  title: "Just 10 minutes.",
                  published: true }) {
                id
                title
                published
                userId
              }
            }
          `,
        })
        .expect(HttpStatus.OK);
    });

    it('removePost', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              removePost(id: ${mockPost.id})
              {
                id
                title
                published
                userId
              }
            }
          `,
        })
        .expect(HttpStatus.OK);
    });
  });
});
