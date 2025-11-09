import { CanActivate, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class PermissionsGuard implements CanActivate {
  canActivate(context: any): boolean {
    const request = context.switchToHttp().getRequest();

    
    if(request.method === 'DELETE' && request.path !== '/logout' && request.session?.role === 1){
      throw new ForbiddenException('You do not have the permission to perform this action');
    }

    return request.session.user_token;
  }
}