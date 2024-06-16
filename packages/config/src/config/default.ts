import { Transport } from "@nestjs/microservices";
import { IConfig } from "../config.types";

export const defaultConfig: IConfig = {
  appName: "A",
  expressPort: 3007,
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
