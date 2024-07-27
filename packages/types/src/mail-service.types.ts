export interface ISendOtpEmailOptions {
  to: string;
  context: {
    code: number | string;
    message: string;
    link?: string;
  };
}
