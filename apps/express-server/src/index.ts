import express from "express";
import { config } from "@repo/config";
import { ClientProxyFactory } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

const { expressPort, nestMicroserviceClientOptions } = config;
const app = express();

app.get("/", async (_req, res) => {
  const client = ClientProxyFactory.create(nestMicroserviceClientOptions);
  await client.connect();
  const msRes = await lastValueFrom(
    client.send({ cmd: "user-add" }, "NewName")
  );
  res.send(msRes);
});

app.listen(expressPort, () => {
  console.log(`Example app listening on port ${expressPort}`);
});
