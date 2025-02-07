import { Resolver,  Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from '../entity/user.entity';
import { Public } from '../auth/decorator/public.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
@UseGuards(GqlAuthGuard, RolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @Public()
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.createAdmin(createUserInput);
  }
}
