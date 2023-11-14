import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { Post } from 'src/posts/entities/post.entity';
import { IsEmail, IsEnum } from 'class-validator';
import { $Enums } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  @IsEnum(['ADMIN', 'USER'])
  role: $Enums.Role;

  @Field(() => [Post], { nullable: true })
  posts?: [Post] | null;

  @Field(() => Profile, { nullable: true })
  profile?: Profile | null;
}
