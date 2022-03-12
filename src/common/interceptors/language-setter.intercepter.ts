import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

export interface Response<T> {
  T;
}

@Injectable()
export class LangaugeSetter<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    let language =
      context.switchToHttp().getRequest().headers['accept-language'] || 'ar';

    return next.handle().pipe(
      map(data => {
        // if data is wrapped in data object, extract the content
        if (_.has(data, 'data')) {
          const { data: dataContent } = data;
          this.setAppName(dataContent, language);
        } else {
          this.setAppName(data, language);
        }
        return data;
      }),
    );
  }

  setAppName(data: any, language: any, isSequelizeInstance = false): T {
    // terminating case
    if (!data) {
      return;
    }
    if (isSequelizeInstance && typeof data !== 'object') {
      return data;
    }
    // set data language
    if (typeof data === 'object')
      data.$local = language;
    // if dataContent is a defined object
    this.setObjectAppName(data, language);
    // if dataContent is an array
    if (Array.isArray(data)) {
      data.forEach(r => {
        // make sure r is object before adding $locale
        if (isSequelizeInstance && typeof r !== 'object') {
          return;
        }
        if (typeof r === 'object')
          r.$local = language;
        this.setObjectAppName(r, language);
      });
    }
  }

  setObjectAppName(obj, lang) {
    // if object isn't sequelize instance but has arrays
    Object.keys(obj).forEach(key => {
      if (Array.isArray(obj[key])) {
        this.setAppName(obj[key], lang, true);
      }
    });
    // if object isn't sequelize instance return
    if (!obj.constructor.associations) {
      return obj;
    }
    // handle associations
    Object.values(obj.constructor.associations).forEach((assoc: any) => {
      (Array.isArray(obj[assoc.as]) ? obj[assoc.as] : [obj[assoc.as]]).forEach(
        s => {
          this.setAppName(s, lang);
        },
      );
    });
  }
}
