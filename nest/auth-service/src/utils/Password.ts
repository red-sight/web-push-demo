import { pbkdf2Sync, randomBytes } from 'node:crypto';

export class Password {
  password: string;
  salt: string;
  hash: string;
  iterations: number;
  keylen: number;
  digest: string;

  constructor({
    password,
    salt,
    iterations = 100000,
    keylen = 64,
    digest = 'sha512',
  }: {
    password: string;
    salt?: string;
    iterations?: number;
    keylen?: number;
    digest?: string;
  }) {
    this.password = password;
    this.iterations = iterations;
    this.keylen = keylen;
    this.digest = digest;
    this.salt = salt || this.genSalt();
    this.hash = this.genHash();
  }

  public verify(hash: string) {
    return this.hash === hash;
  }

  private genHash() {
    return pbkdf2Sync(
      this.password,
      this.salt,
      this.iterations,
      this.keylen,
      this.digest,
    ).toString('hex');
  }

  private genSalt() {
    return randomBytes(16).toString('hex');
  }
}
