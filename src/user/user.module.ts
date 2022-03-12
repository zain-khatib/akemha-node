import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersProvider } from './user.provider';

@Module({
  providers: [UserService, ...UsersProvider],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
