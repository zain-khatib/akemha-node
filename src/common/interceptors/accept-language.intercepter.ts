import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { parse } from 'accept-language-parser';
import User from '../../user/user.model';
const ISO = require('iso-639-1');
@Injectable()
export class LanguageValidation implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    let lang = parse(
      context.switchToHttp().getRequest().headers['accept-language'] || 'ar',
    )[0].code.toLowerCase();
    if (!ISO.validate(lang)) {
      lang = 'ar';
    }
    const user: User = request.user;
    if (user) {
      user.language = lang;
      await user.save();
    }
    request.headers['accept-language'] = lang;
    return next.handle();
  }
}
