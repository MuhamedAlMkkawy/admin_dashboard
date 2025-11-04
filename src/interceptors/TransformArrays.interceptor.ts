// transform.interceptor.ts
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
    // No response transformation - response data remains as is
  }

  private transformData(data: any): any {
    if (data === null || data === undefined) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map(item => this.transformObject(item));
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
    
    // Handle array transformations first
    this.transformArrayProperties(transformed);
    
    // Then recursively transform nested objects
    for (const key in transformed) {
      if (transformed.hasOwnProperty(key)) {
        transformed[key] = this.transformData(transformed[key]);
      }
    }

    return transformed;
  }

  private transformArrayProperties(obj: any): void {
    const arrayPatterns = new Map<string, any[]>();
    
    // Find all keys that match pattern: arrayName[index]property or arrayName[index].property
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Match patterns like: items[0]title, items[0].title, items[0]data.title, etc.
        const match = key.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(\d+)\](?:\.?([\w\.]+))?$/);
        if (match) {
          const [, arrayName, indexStr, propertyPath] = match;
          const arrayIndex = parseInt(indexStr, 10);
          
          if (isNaN(arrayIndex)) continue;
          
          if (!arrayPatterns.has(arrayName)) {
            arrayPatterns.set(arrayName, []);
          }
          
          const array = arrayPatterns.get(arrayName)!;
          
          // Ensure array has enough elements
          while (array.length <= arrayIndex) {
            array.push({});
          }
          
          if (propertyPath) {
            // Handle nested properties like items[0].data.title
            this.setNestedProperty(array[arrayIndex], propertyPath, obj[key]);
          } else {
            // If no property path, use the value directly (for cases like items[0] = value)
            Object.assign(array[arrayIndex], obj[key]);
          }
          
          // Mark this key for deletion
          delete obj[key];
        }
      }
    }
    
    // Add the transformed arrays to the object
    for (const [arrayName, array] of arrayPatterns) {
      // Only set the array if it has valid items
      const validArray = array.filter(item => 
        item && typeof item === 'object' && Object.keys(item).length > 0
      );
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