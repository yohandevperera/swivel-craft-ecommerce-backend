import { SetMetadata } from '@nestjs/common';
import { RolesForGuard } from 'src/auth/roles';

export const Roles = (...roles: RolesForGuard[]) => SetMetadata('roles', roles);
