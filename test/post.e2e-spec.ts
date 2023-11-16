import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from './../src/auth/jwt-auth.guard';
import { PostsService } from './../src/posts/posts.service';

describe('PostsResolver (e2e)', () => {
  let app: INestApplication;
  const postsService = {
    create: () => mockPost,
    findAll: () => [mockPost, mockPost],
    findOne: () => mockPost,
    update: () => mockPost,
    remove: () => mockPost,
  };

  const mockPost = {
    id: 1,
    title: 'Check out Prisma with Nest.js',
    published: false,
    userId: 1,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(PostsService)
      .useValue(postsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

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
      .expect({ data: { createPost: postsService.create() } });
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
      .expect(HttpStatus.OK)
      .expect({ data: { posts: postsService.findAll() } });
  });

  it('findOne', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            post(id: 1) {
              id
              title
              published
              userId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { post: postsService.findOne() } });
  });

  it('updatePost', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updatePost(
              id: 6,
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
      .expect(HttpStatus.OK)
      .expect({ data: { updatePost: postsService.update() } });
  });

  it('removePost', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removePost(id: 6)
            {
              id
              title
              published
              userId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { removePost: postsService.remove() } });
  });

  afterAll(async () => {
    await app.close();
  });
});
