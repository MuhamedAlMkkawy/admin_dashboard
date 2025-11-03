import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Extract pagination info from query (defaults)
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 15;

    return next.handle().pipe(
      map((data) => {
        // 🔹 If controller returns { status, message, data } already → skip wrapping
        if (data?.status && data?.data !== undefined) {
          return data;
        }

        // 🔹 Handle pagination for array data
        if (Array.isArray(data)) {
          const totalItems = data.length;
          const totalPages = Math.ceil(totalItems / limit);
          const start = (page - 1) * limit;
          const end = start + limit;
          const paginatedData = data.slice(start, end);

          return {
            status: 'success',
            message: 'Data Sent Successfully',
            data: paginatedData,
            pagination: {
              total_items: totalItems,
              page,
              limit,
              total_pages: totalPages,
            },
          };
        }

        // 🔹 If controller returned an object with { message, data } → merge safely
        if (data && typeof data === 'object' && 'message' in data && 'data' in data) {
          return {
            status: 'success',
            message: data.message,
            data: data.data,
          };
        }

        // 🔹 Default fallback for single response values
        return {
          status: 'success',
          message: 'Data Sent Successfully',
          data: data ?? null,
        };
      }),
    );
  }
}
