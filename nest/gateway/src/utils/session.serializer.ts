import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  deserializeUser(payload: any, done: Function) {
    return done(null, payload);
  }
}
