import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'prisma/prisma.module';
import { RolesGuard } from './roles.guards';
@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with env variable later
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy,RolesGuard],
  exports: [JwtStrategy, PassportModule, JwtModule,RolesGuard],
})
export class AuthModule {}
