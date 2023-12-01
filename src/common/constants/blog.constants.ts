import { Post, Profile, User } from '@prisma/client';

export const post: Post = {
  id: 1,
  title: 'Test Post',
  published: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
};
export const posts: Post[] = [post];

export const profile: Profile = {
  id: 1,
  bio: 'Happy',
  userId: 1,
};
export const profiles: Profile[] = [profile];

export const user: User = {
  id: 1,
  createdAt: new Date(),
  email: 'andrew@prisma.io',
  name: 'Andrew',
  password: 'whoami',
  role: 'ADMIN',
};
export const users: User[] = [user];
