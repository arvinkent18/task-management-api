import { AuthorizationAbilityFactory } from './authorization-ability.factory';
import { Module } from '@nestjs/common';

@Module({
  providers: [AuthorizationAbilityFactory],
  exports: [AuthorizationAbilityFactory],
})
export class AuthorizationModule {}
