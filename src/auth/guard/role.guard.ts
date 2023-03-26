import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector:Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(),
        context.getClass(),
    ]);    
    if (!requiredRoles) {
        return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    
    return requiredRoles.some((role) => user.type?.includes(role));
  }
}
