import { ERole } from "enums";
import { IAvailableOtpChannel } from "../otp.types";

export interface IUserSessionData {
  id: string;
  role: ERole;
  availableOtpChannels?: IAvailableOtpChannel[];
}
