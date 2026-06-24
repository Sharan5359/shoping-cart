/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const path = request.url;

    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    if (path.includes('/products') && user.role !== 'STAFF') {
      throw new ForbiddenException('Only STAFF can manage products');
    }

    if (path.includes('/cart') && user.role !== 'CUSTOMER') {
      throw new ForbiddenException('Only CUSTOMERS can manage cart items');
    }

    return true;
  }
}
