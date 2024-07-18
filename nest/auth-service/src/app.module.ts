import { Module } from '@nestjs/common';
import { RolesModule } from './modules/roles/roles.module';
import { SignupModule } from './modules/signup/signup.module';
import { SigninModule } from './modules/signin/signin.module';

@Module({
  imports: [RolesModule, SignupModule, SigninModule],
  providers: [],
})
export class AppModule {}
