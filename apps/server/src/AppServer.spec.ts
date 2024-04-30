import { AppServer } from './AppServer';

describe('AppServer class', () => {
  it('create a server', async () => {
    const appServer = new AppServer({ port: 3000 });
    const spy = jest.spyOn(appServer.app, 'listen');
    await appServer.start();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(3000, expect.any(Function));
    await appServer.stop();
  });
});
