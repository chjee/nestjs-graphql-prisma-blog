import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInInput, SignInOutput } from '../users/dto/signin-user';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInInput: SignInInput): Promise<SignInOutput> {
    const user = await this.usersService.findUser({
      email: signInInput.email,
    });
    if (user?.password !== signInInput.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, name: user.name };
    return { token: await this.jwtService.signAsync(payload) };
  }
}
