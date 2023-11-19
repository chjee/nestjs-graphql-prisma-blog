import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { Post } from '../../posts/entities/post.entity';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'User ID' })
  @IsNotEmpty()
  id: number;

  @Field(() => Date, { description: 'Created Date' })
  createdAt: Date;

  @Field(() => String, { description: 'User Email' })
  @IsNotEmpty()
  @IsEmail()
  @Length(6, 60)
  email: string;

  @Field(() => String, { nullable: true, description: 'User Name' })
  name?: string;

  @Field(() => String, { description: 'Password' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  password: string;

  @Field(() => String, { description: 'User Role' })
  @IsNotEmpty()
  @IsString()
  @IsEnum(['ADMIN', 'USER'])
  role: string;

  @Field(() => [Post], { nullable: true, description: 'User Posts' })
  posts?: [Post] | null;

  @Field(() => Profile, { nullable: true, description: 'User Profile' })
  profile?: Profile | null;
}
