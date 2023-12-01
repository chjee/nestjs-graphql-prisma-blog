import { Post, Profile, User } from '@prisma/client';
import { CreatePostInput } from './../../posts/dto/create-post.input';
import { UpdatePostInput } from './../../posts/dto/update-post.input';
import { CreateProfileInput } from './../../profiles/dto/create-profile.input';
import { UpdateProfileInput } from './../../profiles/dto/update-profile.input';
import { CreateUserInput } from './../../users/dto/create-user.input';
import { UpdateUserInput } from './../../users/dto/update-user.input';

export const post: Post = {
  id: 1,
  title: 'Test Post',
  published: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
};
export const posts: Post[] = [post];

export const createPostInput: CreatePostInput = {
  title: 'Just 10 minutes.',
  published: false,
  userId: 1,
  user: {
    connect: {
      id: 1,
    },
  },
};

export const updatePostInput: UpdatePostInput = {
  title: 'Just 5 minutes.',
  published: true,
};

export const profile: Profile = {
  id: 1,
  bio: 'Happy',
  userId: 1,
};
export const profiles: Profile[] = [profile];

export const createProfileInput: CreateProfileInput = {
  bio: 'Happy',
  userId: 1,
};

export const updateProfileInput: UpdateProfileInput = {
  bio: 'Soso',
};

export const user: User = {
  id: 1,
  createdAt: new Date(),
  email: 'andrew@prisma.io',
  name: 'Andrew',
  password: 'whoami',
  role: 'ADMIN',
};
export const users: User[] = [user];

export const createUserInput: CreateUserInput = {
  email: 'chjee@naver.com',
  name: 'Andrew',
  password: '123456',
  role: 'ADMIN',
};

export const updateUserInput: UpdateUserInput = {
  role: 'USER',
};
