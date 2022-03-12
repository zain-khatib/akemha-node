import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../user/enum/role.enum';
import { UserService } from '../user/user.service';
import UserRegisterDto from './dto/userRegister.dto';
import UserSignInDto from './dto/userSignIn.dto';
import * as config from 'config';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtSerivce: JwtService,
  ) { }
  async register(UserRegisterDto: UserRegisterDto) {
    const role = UserRegisterDto.adminSecret === config.get('admin.secret') ? Role.ADMIN : Role.CUSTOMER;
    const user = await this.userService.createOne({ ...UserRegisterDto, role });
    const token = await this.generateToken(user.id, user.role);
    return { ...user.get(), token };
  }

  async signIn(userSignInDto: UserSignInDto) {
    const user = await this.userService.findOne({ nationalId: userSignInDto.nationalId });
    const validUser = await user.isValidPassword(userSignInDto.password);
    if (!validUser) throw new HttpException({ statusCode: 403, message: "Invalid Id or password" }, 403);;
    const token = await this.generateToken(user.id, user.role);
    return { ...user.get(), token, expiryTime: moment().add(4, 'h') };
  }

  async generateToken(userId: number, role: Role) {
    const payload = {
      userId,
      role,
      timestamp: new Date().getTime(),
    }
    return this.jwtSerivce.sign(payload);
  }
  async getUserByToken(token) {
    const data: any = this.jwtSerivce.decode(token);
    return this.userService.getOne(data.userId);
  }
}
