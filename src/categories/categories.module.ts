import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { PostsService } from './../posts/posts.service';

@Module({
  providers: [CategoriesResolver, CategoriesService, PostsService],
})
export class CategoriesModule {}
