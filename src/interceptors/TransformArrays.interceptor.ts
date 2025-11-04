import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TransformFlatToNestedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Transform request body before it reaches the controller
    if (request.body && typeof request.body === 'object') {
      request.body = this.transformData(request.body);
    }

    return next.handle();
  }

  private transformData(data: any): any {
    if (data === null || data === undefined) return data;

    if (Array.isArray(data)) {
      return data.map((item, i) => {
        const transformed = this.transformObject(item);
        // Add an id automatically (starting from 1)
        if (!('id' in transformed)) {
          transformed.id = i + 1;
        }
        return transformed;
      });
    }

    if (typeof data === 'object') {
      return this.transformObject(data);
    }

    return data;
  }

  private transformObject(obj: any): any {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      return obj;
    }

    const transformed = { ...obj };

    // Handle arrays first
    this.transformArrayProperties(transformed);

    // Recursively handle nested objects
    for (const key in transformed) {
      if (transformed.hasOwnProperty(key)) {
        transformed[key] = this.transformData(transformed[key]);
      }
    }

    return transformed;
  }

  private transformArrayProperties(obj: any): void {
    const arrayPatterns = new Map<string, any[]>();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Match patterns like: items[0].title, items[0].data.name, etc.
        const match = key.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(\d+)\](?:\.?([\w\.]+))?$/);
        if (match) {
          const [, arrayName, indexStr, propertyPath] = match;
          const arrayIndex = parseInt(indexStr, 10);
          if (isNaN(arrayIndex)) continue;

          if (!arrayPatterns.has(arrayName)) arrayPatterns.set(arrayName, []);

          const array = arrayPatterns.get(arrayName)!;
          while (array.length <= arrayIndex) {
            array.push({});
          }

          if (propertyPath) {
            this.setNestedProperty(array[arrayIndex], propertyPath, obj[key]);
          } else {
            Object.assign(array[arrayIndex], obj[key]);
          }

          delete obj[key];
        }
      }
    }

    // Finalize arrays: add IDs
    for (const [arrayName, array] of arrayPatterns) {
      const validArray = array
        .filter(item => item && typeof item === 'object' && Object.keys(item).length > 0)
        .map((item, index) => {
          // Add `id` if missing
          if (!('id' in item)) {
            item.id = index + 1;
          }
          return item;
        });

      if (validArray.length > 0) {
        obj[arrayName] = validArray;
      }
    }
  }

  private setNestedProperty(obj: any, path: string, value: any): void {
    const parts = path.split('.');
    let current = obj;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part] || typeof current[part] !== 'object') {
        current[part] = {};
      }
      current = current[part];
    }

    const lastPart = parts[parts.length - 1];
    current[lastPart] = value;
  }
}
