import {
  ClientProviderOptions,
  MicroserviceOptions
} from "@nestjs/microservices";

export interface IConfig {
  appName: string;
  nestMicroserviceOptions: MicroserviceOptions;
  nestMicroserviceClientOptions: ClientProviderOptions;
}
