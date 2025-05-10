// src/auth/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Extract the user object from the request
  },
);

export interface JwtUser {
  username: string;
  firstname: string;
  lastname: string;
  role: string;
}
