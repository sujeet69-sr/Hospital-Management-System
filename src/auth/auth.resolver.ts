import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Public } from './decorator/public.decorator';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String, { name: 'login' })
  @Public()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username, password);
    const tokens = await this.authService.login(user);
    return tokens.access_token;
  }
}
