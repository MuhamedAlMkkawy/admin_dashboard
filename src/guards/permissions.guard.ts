import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class PermissionsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    const openRoutes = ['/login', '/signup', '/logout'];
    if (openRoutes.includes(request.path)) return true;

    if (!session || !session.user_token) {
      throw new UnauthorizedException({
        en: 'You must be logged in to perform this action',
        ar: 'يجب أن تقوم بتسجيل الدخول لتنفيذ هذا الإجراء',
      });
    }

    if (request.method === 'DELETE' && session.role === 1) {
      throw new ForbiddenException({
        en: 'You do not have permission to perform this action',
        ar: 'ليس لديك صلاحية لتنفيذ هذا الإجراء',
      });
    }

    return true;
  }
}
