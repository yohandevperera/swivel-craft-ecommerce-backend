import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesForGuard } from 'src/auth/roles';
import _ = require('lodash');

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesForGuard[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    if (!requiredRoles) {
      return true;
    }
    const test = this.reflector.getAllAndMerge<any>(
      'allowUnauthorizedRequest',
      [context.getHandler(), context.getClass()],
    );
    console.log(test);
    console.log(request.user);
    // console.log(
    //   !_.isUndefined(request.user)
    //     ? _.includes(requiredRoles, request.user?.userRole)
    //     : false,
    // );

    // return !_.isUndefined(user)
    //   ? _.includes(requiredRoles, user?.userRole)
    //   : false;
    return true;
  }
}
