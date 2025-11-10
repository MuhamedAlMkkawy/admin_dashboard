import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const lang =
      (request.query.lang ||
        request.headers['accept-language'] ||
        'en')
        .toString()
        .toLowerCase();

    const selectedLang = ['ar', 'en'].includes(lang) ? lang : 'en';

    const localize = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(localize);
      }

      // Skip null, undefined, Date, ObjectId, or primitive values
      if (
        !obj ||
        typeof obj !== 'object' ||
        obj instanceof Date ||
        (obj.constructor && obj.constructor.name === 'ObjectId')
      ) {
        return obj;
      }

      // If object has only { en, ar } → return selected language
      const keys = Object.keys(obj);
      if (keys.length === 2 && keys.includes('en') && keys.includes('ar')) {
        return obj[selectedLang] ?? obj['en'];
      }

      // Otherwise, recursively process child fields
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        //  Skip touching _id field (MongoDB ObjectId)
        if (key === '_id') {
          result[key] = value;
        } else {
          result[key] = localize(value);
        }
      }
      return result;
    };

    return next.handle().pipe(
      map((response) => {
        if (!response) return response;
        return localize(response);
      }),
    );
  }
}
