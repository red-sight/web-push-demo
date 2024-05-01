import { EDeviceType } from '@packages/types';

export class Device {
  public deviceType: EDeviceType;

  constructor({ deviceType }: { deviceType: EDeviceType }) {
    this.deviceType = deviceType;
  }
}
