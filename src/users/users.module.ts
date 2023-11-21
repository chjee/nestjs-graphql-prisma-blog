import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from '../profiles/profiles.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService, PostsService, ProfilesService],
  exports: [UsersService],
})
export class UsersModule {}
