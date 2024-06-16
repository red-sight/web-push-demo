import { Transport } from "@nestjs/microservices";
import { IConfig } from "../config.types";

export const defaultConfig: IConfig = {
  appName: "A",
  nestMicroserviceOptions: {
    transport: Transport.REDIS,
    options: {
      host: "localhost",
      port: 6379
    }
  },
  nestMicroserviceClientOptions: {
    name: "ms-name",
    transport: Transport.REDIS,
    options: {
      host: "localhost",
      port: 6379
    }
  }
};
