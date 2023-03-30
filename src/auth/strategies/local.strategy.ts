import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    // Find a user with the provided username
    const user = await this.userService.findByUsername(username);

    // If a user was found, verify the provided password
    if (user && (await argon.verify(user.password, password))) {
      // If the password was verified correctly, remove the password from the user object and return it
      const { password, ...result } = user;
      return result;
    }

    // If the password was not verified correctly, throw an UnauthorizedException
    throw new UnauthorizedException();
  }
}
