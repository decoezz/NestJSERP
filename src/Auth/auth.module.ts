import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'prisma/prisma.module';
import { RolesGuard } from './roles.guards';
import { NotAuthenticatedGuard } from 'middleware/not-authenticated.middleware';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'default-secret',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PrismaModule
  ],
  providers: [JwtStrategy,RolesGuard,NotAuthenticatedGuard],
  exports: [JwtStrategy, PassportModule, JwtModule,RolesGuard,NotAuthenticatedGuard],
})
export class AuthModule {}
