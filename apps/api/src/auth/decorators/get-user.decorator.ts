import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { UserRequest } from '../interfaces/req-user.interface';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();

  const { user } = req;

  if (!user) throw new ForbiddenException('User not found in the request');

  return user;
});
