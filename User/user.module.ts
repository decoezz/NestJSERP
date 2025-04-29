/*
https://docs.nestjs.com/modules
*/

import { Module  } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/Auth/auth.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
@Module({
  imports: [PrismaModule,AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
