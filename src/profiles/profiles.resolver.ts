import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation(() => Profile)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<Profile> {
    return this.profilesService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Profile[]> {
    return this.profilesService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Profile, { name: 'profile' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Profile> {
    return this.profilesService.findOne({ id });
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ): Promise<Profile> {
    return this.profilesService.update({
      where: { id: id },
      data: updateProfileInput,
      // data: { ...updateProfileInput }, // , ...updateProfileInput
    });
  }

  @Mutation(() => Profile)
  async removeProfile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<any> {
    return this.profilesService.remove({ id: id });
  }
}
