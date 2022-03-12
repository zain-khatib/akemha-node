import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../common/decorators/publicRoute.decorator';
import { AuthService } from './auth.service';
import UserRegisterDto from './dto/userRegister.dto';
import UserSignInDto from './dto/userSignIn.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) { }


  @Post('register')
  @IsPublic()
  async register(
    @Body() userRegisterDto: UserRegisterDto
  ) {
    return this.authService.register(userRegisterDto);
  }

  @Post('signin')
  @IsPublic()
  async signin(
    @Body() userSignInDto: UserSignInDto
  ) {
    return this.authService.signIn(userSignInDto);
  }
}
