import { Transport } from "@nestjs/microservices";
import { IConfig } from "../config.types";

export const defaultConfig: IConfig = {
  appName: "A",
  expressPort: 3007,
  adminEmail: process.env["ADMIN_EMAIL"] as string,
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
  },
  googleOAuthCreds: {
    clientID: process.env["GOOGLE_OAUTH_CLIENT_ID"] as string,
    clientSecret: process.env["GOOGLE_OAUTH_CLIENT_SECRET"] as string,
    callbackURL: "http://localhost:3033/auth/google/redirect",
    scope: ["profile", "email"]
  },
  permissions: {
    ROOT: "ROOT"
  }
};
