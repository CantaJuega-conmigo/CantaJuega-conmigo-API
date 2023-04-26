import {
    ExecutionContext,
    ForbiddenException,
    InternalServerErrorException,
    createParamDecorator,
  } from '@nestjs/common';
  
  export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
  
    if (!user) {
      throw new ForbiddenException('Access Denied: Authorization Required');
    }
  
    return user;
  });
  