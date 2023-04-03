import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the required roles from the route handler
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    // If no roles are required, then return true
    if (!requiredRoles) {
      return true;
    }
    // Get the request and the user from the request
    const { user } = context.switchToHttp().getRequest();
    // Check if the user has any of the required roles
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
