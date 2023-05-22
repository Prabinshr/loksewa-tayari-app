import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TOKENS } from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TOKENS.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    // check if user exists and access_token is not malformed
    const user = await this.userService.findOne(payload.sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
