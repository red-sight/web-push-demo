import { ERouterType } from '@packages/types';
import { Router } from '../Router';
import { Config, NodeSSH, SSHExecCommandOptions } from 'node-ssh';

interface IEntwareRouterOpts extends Config {
  name: string;
  supressWarnings: boolean;
}

export class EntwareRouter extends Router {
  private config: Config;
  public connection?: NodeSSH;
  private name: string;
  public ssh: NodeSSH = new NodeSSH();
  private supressWarnings: boolean;

  constructor({ name, supressWarnings = true, ...config }: IEntwareRouterOpts) {
    super({ routerType: ERouterType.entware });
    this.name = name;
    this.supressWarnings = supressWarnings;
    this.config = config;
  }

  public async connect(): Promise<EntwareRouter> {
    try {
      this.connection = await this.ssh.connect(this.config);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Failed to connect to router ${this.name}\n ${e}`);
    }
    return this;
  }

  public async request(givenCommand: string, options?: SSHExecCommandOptions) {
    if (!this.connection) await this.connect();
    const res = await this.connection?.execCommand(givenCommand, options);
    if (!res) throw new Error('No response from router');
    if (res.code !== 0) {
      if (res.stderr)
        throw new Error(
          `Router "${this.name}" SSH command returned status ${res.code}, ${res.stderr}`
        );
    }
    if (res.stderr && !this.supressWarnings)
      console.warn(
        `Router "${this.name}" SSH command returned non-critical error: ${res.stderr}`
      );
    return res;
  }

  public async listLeases() {
    const res = await this.request(
      "arp-scan --interface=br0 --localnet -d --format='${ip}\t${name}\t${mac}\t${vendor}'"
    );
    return res.stdout
      .split('\n')
      .slice(2, -3)
      .map(line => {
        const arr = line.split('\t');
        return {
          ip: arr[0],
          name: arr[1],
          mac: arr[2],
          desc: arr[3],
        };
      });
  }
}
