// src/auth/guards/not-authenticated.guard.ts
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    // If no Authorization header, user is not authenticated, allow the request
    if (!authHeader) {
      return true;
    }

    // Check if the header is in the correct format (Bearer <token>)
    if (!authHeader.startsWith('Bearer ')) {
      return true;
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      this.jwtService.verify(token);
      // If token is valid, user is already authenticated, throw an error
      throw new HttpException('You are already logged in', HttpStatus.BAD_REQUEST);
    } catch (error) {
      // If token verification fails (e.g., invalid or expired token), allow the request
      if (!(error instanceof HttpException)) {
        return true;
      }
      throw error;
    }
  }
}