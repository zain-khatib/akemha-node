import { ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../decorators/publicRoute.decorator";
import { ROLES_KEY } from "../decorators/role.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const ispublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (ispublic) return true;
    const parentGuard = await super.canActivate(context);
    if (!parentGuard) return false;
    const role = this.reflector.get<string>(ROLES_KEY, context.getHandler());
    if (!role) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return (user.role === role);
  }
}