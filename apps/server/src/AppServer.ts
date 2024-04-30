import express, { Application } from 'express';
import { IncomingMessage, Server, ServerResponse } from 'http';

export class AppServer {
  public app: Application;
  public port: number;
  public server?: Server<typeof IncomingMessage, typeof ServerResponse>;

  constructor({ port }: { port: number }) {
    this.app = express();
    this.port = port;
  }

  public async start() {
    return new Promise((resolve, reject) => {
      this.server = this.app
        .listen(this.port, () => {
          console.log(`Server is listening on port ${this.port}`);
          resolve(this);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  public stop() {
    return new Promise((resolve, reject) => {
      if (!this.server) reject('Server does not exist');
      this.server?.close(err => {
        if (err) reject(err);
        resolve(this);
      });
    });
  }
}
