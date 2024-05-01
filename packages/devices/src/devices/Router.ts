import { EDeviceType, ERouterType } from '@packages/types';
import { Device } from '../Device';

export class Router extends Device {
  public routerType: ERouterType;

  constructor({ routerType }: { routerType: ERouterType }) {
    super({ deviceType: EDeviceType.router });
    this.routerType = routerType;
  }
}
