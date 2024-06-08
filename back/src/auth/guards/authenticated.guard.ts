import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    try {
      const request: Request = context.switchToHttp().getRequest();
      return request.isAuthenticated();
    } catch (error) {
      throw error;
    }
  }
}
