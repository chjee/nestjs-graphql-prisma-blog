import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType({ description: 'Update User Input' })
export class UpdateUserInput extends PickType(PartialType(CreateUserInput), [
  'name',
  'role',
] as const) {}
