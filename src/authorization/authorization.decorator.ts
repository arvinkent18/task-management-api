import { SetMetadata } from '@nestjs/common';
import { AuthorizationAction } from './authorization-action.enum';

export const ACTION_KEY = 'action';
export const Authorize = (action: AuthorizationAction) =>
  SetMetadata(ACTION_KEY, action);