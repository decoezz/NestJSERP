import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, 
    });
  }
  async validate(payload: { sub: number; username: string }) {
    const user = await this.prisma.user.findUnique({
      where: { userid: payload.sub },
      include: { employee: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      id: user.userid,
      username: user.username,
      role: user.employee?.role,
    };
  }
}
