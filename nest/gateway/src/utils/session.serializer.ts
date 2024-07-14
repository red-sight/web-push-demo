import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: any, done: Function) {
    console.log('In serializeUser', user);
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  deserializeUser(payload: any, done: Function) {
    console.log('In deserializeUser', payload);
    return done(null, payload);
  }
}
