import { CanActivate, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: any): boolean {
    const request = context.switchToHttp().getRequest();
    // console.log('AuthGuard - User Token:', request.session.userToken);

    const openRoutes = ['/login', '/signup'];
    if (openRoutes.includes(request.path)) {
      return true; // allow without token
    }

    return request.session.user_token;
  }
}