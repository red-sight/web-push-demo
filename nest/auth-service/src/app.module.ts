import { Global, Module } from '@nestjs/common';
import { RolesModule } from './modules/roles/roles.module';
import { SignupModule } from './modules/signup/signup.module';
import { SigninModule } from './modules/signin/signin.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsToRpcFilter } from '@repo/utils-nest';

@Global()
@Module({
  imports: [RolesModule, SignupModule, SigninModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsToRpcFilter,
    },
  ],
})
export class AppModule {}
