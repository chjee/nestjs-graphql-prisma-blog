import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UsersService } from './../users/users.service';
import { CategoriesService } from './../categories/categories.service';

@Module({
  providers: [PostsResolver, PostsService, UsersService, CategoriesService],
})
export class PostsModule {}
