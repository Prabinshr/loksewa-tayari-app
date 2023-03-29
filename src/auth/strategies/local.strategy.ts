import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && await argon.verify(user.password, password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }
}
