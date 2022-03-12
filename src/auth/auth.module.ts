import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: { expiresIn: '4h' }
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
