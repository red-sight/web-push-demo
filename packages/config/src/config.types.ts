import {
  ClientProviderOptions,
  MicroserviceOptions
} from "@nestjs/microservices";

export interface IConfig {
  appName: string;
  expressPort: number;
  nestMicroserviceOptions: MicroserviceOptions;
  nestMicroserviceClientOptions: ClientProviderOptions;
}
