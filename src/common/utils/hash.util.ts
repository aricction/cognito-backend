import * as bcrypt from 'bcrypt';

export const hash = async (value: string) => bcrypt.hash(value, 10);
export const compare = async (value: string, hash: string) =>
  bcrypt.compare(value, hash);
