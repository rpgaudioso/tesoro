import { CanActivate, ExecutionContext, ForbiddenException, Injectable, createParamDecorator } from '@nestjs/common';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const workspaceId = request.headers['x-workspace-id'];

    if (!workspaceId) {
      throw new ForbiddenException('Workspace ID não fornecido');
    }

    const hasAccess = user.members.some((m: any) => m.workspaceId === workspaceId);

    if (!hasAccess) {
      throw new ForbiddenException('Acesso negado ao workspace');
    }

    request.workspaceId = workspaceId;
    return true;
  }
}

export const WorkspaceId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.workspaceId;
  },
);
