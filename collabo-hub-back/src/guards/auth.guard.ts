import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RequestAuth, TokenData } from '../interfaces/requetsAuth'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.signedCookies['token'];

    if (!token)
      throw new UnauthorizedException('Authentication token is missing');

    try {
      const payload = await this.jwtService.verifyAsync(token);
      (request as RequestAuth).tokenData = payload as TokenData;
    } catch {
      throw new UnauthorizedException('Authentication token is invalid or expired');
    }
    return true;
  }
}
