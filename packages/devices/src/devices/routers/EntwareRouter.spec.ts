import { Config, SSHExecCommandResponse } from 'node-ssh';
import { generateKeyPairSync } from 'crypto';
import { EntwareRouter } from './EntwareRouter';

const sshConnectionOpts: Config = {
  host: '192.168.1.1',
  username: 'root',
  privateKey: generatePrivateKeyStub(),
};

let router: EntwareRouter;

const connectionOpts = {
  ...sshConnectionOpts,
  name: 'Test entware router',
  supressWarnings: true,
};

describe('entware router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    router?.connection?.connection?.end();
    router?.connection?.connection?.destroy();
  });

  it('connect: successful connection', async () => {
    router = new EntwareRouter(connectionOpts);
    const spy = spyOnConnection();
    const res = await router.connect();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(sshConnectionOpts);
    expect(res).toEqual(router);
  });

  it('connect: connection timeout error', async () => {
    router = new EntwareRouter({
      ...connectionOpts,
      readyTimeout: 10,
      host: '192.168.222.111',
    });
    await expect(router.connect()).rejects.toThrow(
      'Failed to connect to router Test entware router\n Error: Timed out while waiting for handshake'
    );
  });

  it('request: send command', async () => {
    router = new EntwareRouter({
      ...connectionOpts,
    });
    spyOnConnection();
    await router.connect();
    spyOnRequest({ code: 0, signal: null, stdout: '0', stderr: '' });
    const output = await router.request('echo $?');
    expect(output).toEqual({ code: 0, signal: null, stdout: '0', stderr: '' });
  });

  it('request: error code', async () => {
    router = new EntwareRouter({
      ...connectionOpts,
    });
    spyOnConnection();
    await router.connect();
    spyOnRequest({
      code: 1,
      signal: null,
      stdout: '0',
      stderr: 'An error thrown',
    });
    await expect(router.request('sudo')).rejects.toThrow(
      'Test entware router" SSH command returned status 1, An error thrown'
    );
  });

  it('listLeases: success', async () => {
    jest.setTimeout(10000);
    router = new EntwareRouter({
      ...connectionOpts,
    });
    spyOnConnection();
    await router.connect();
    spyOnRequest({
      code: 0,
      signal: null,
      stdout:
        'Interface: br0, type: EN10MB, MAC: c8:3a:35:05:9a:d0, IPv4: 192.168.1.1\n' +
        'Starting arp-scan 1.10.0 with 256 hosts (https://github.com/royhills/arp-scan)\n' +
        '192.168.1.2\tPC.tenda.wifi\ta8:a1:59:39:6y:89\tASRock Incorporation\n' +
        '192.168.1.5\tGalaxy-A71.tenda.wifi\t42:dd:11:28:59:95\t(Unknown: locally administered)\n' +
        '192.168.1.40\tSamsung.tenda.wifi\ta2:d1:5b:2f:f7:7a\tSamsung Electronics Co.,Ltd\n' +
        '\n' +
        '11 packets received by filter, 0 packets dropped by kernel\n' +
        'Ending arp-scan 1.10.0: 256 hosts scanned in 3.989 seconds (64.18 hosts/sec). 8 responded',
      stderr:
        'WARNING: Cannot open MAC/Vendor file /opt/etc/arp-scan/mac-vendor.txt: No such file or directory',
    });
    const res = await router.listLeases();
    expect(res).toEqual([
      {
        ip: '192.168.1.2',
        name: 'PC.tenda.wifi',
        mac: 'a8:a1:59:39:6y:89',
        desc: 'ASRock Incorporation',
      },
      {
        ip: '192.168.1.5',
        name: 'Galaxy-A71.tenda.wifi',
        mac: '42:dd:11:28:59:95',
        desc: '(Unknown: locally administered)',
      },
      {
        ip: '192.168.1.40',
        name: 'Samsung.tenda.wifi',
        mac: 'a2:d1:5b:2f:f7:7a',
        desc: 'Samsung Electronics Co.,Ltd',
      },
    ]);
  });
});

function spyOnConnection(): jest.SpyInstance {
  return jest.spyOn(router.ssh, 'connect').mockImplementation(async () => {
    return Promise.resolve(router.ssh);
  });
}

function spyOnRequest(data: SSHExecCommandResponse): jest.SpyInstance {
  return jest
    .spyOn(router.ssh, 'execCommand')
    .mockImplementation(() => Promise.resolve(data));
}

function generatePrivateKeyStub(): string {
  const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
  return privateKey.export({
    format: 'pem',
    type: 'pkcs1',
  }) as string;
}
