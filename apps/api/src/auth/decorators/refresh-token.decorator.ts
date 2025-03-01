import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

export const GetRefreshToken = createParamDecorator((data: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest<Request>();

  const { refreshToken } = req.cookies;

  if (!refreshToken) throw new ForbiddenException('No se encontro el refreshToken');

  return data ? req.cookies[data] : refreshToken;
});
