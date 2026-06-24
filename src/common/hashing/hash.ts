import * as bcrypt from 'bcrypt';

export class HashService {
  private readonly saltRounds = 10;
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
