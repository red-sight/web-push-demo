import { TransportType } from "@nestjs-modules/mailer/dist/interfaces/mailer-options.interface";
import {
  ClientProviderOptions,
  MicroserviceOptions
} from "@nestjs/microservices";
import { _StrategyOptionsBase } from "passport-google-oauth20";

export interface IConfig {
  appName: string;
  expressPort: number;
  nestMicroserviceOptions: MicroserviceOptions;
  nestMicroserviceClientOptions: ClientProviderOptions;
  googleOAuthCreds: _StrategyOptionsBase;
  adminEmail: string;
  permissions: {
    [key: string]: string;
  };
  emailUser: string;
  emailTransporter: TransportType;
}
