import * as Crypto from 'crypto';
import { promisify } from 'util';

export type EncryptionInput = {
  blockSize: number;
  keyLength: number;
  N?: number;
  parallelization: number;
  password: string;
  salt: string;
};

const BLOCK_SIZE = 8;
const PARALLELIZATION = 2;
const COST = 16384;
const KEY_LENGTH = 64;
const SALT_BYTE_LEN = 16;

const _encrypt = promisify((
  {
    blockSize,
    keyLength,
    N,
    parallelization,
    password,
    salt,
  }: EncryptionInput, done: Function
) => Crypto.scrypt(password, Buffer.from(salt, 'hex'), keyLength, {
  blockSize,
  cost: N,
  parallelization,
}, (error, derivedKey) => done(error, derivedKey.toString('hex'))))



export async function encrypt(password: string): Promise<string> {
  const salt = Crypto.randomBytes(SALT_BYTE_LEN).toString('hex');
  const input: EncryptionInput = {
    N: COST,
    blockSize: BLOCK_SIZE,
    keyLength: KEY_LENGTH,
    parallelization: PARALLELIZATION,
    password,
    salt,
  };
  const pwdHash = await _encrypt(input);

  return [
    COST.toString(16),
    BLOCK_SIZE.toString(16),
    PARALLELIZATION.toString(16),
    salt,
    pwdHash,
  ].join('$');
}

export async function verify(hash: string, password: string) {
  const [ n, v, r, saltOnly, pwdHash ] = hash.split('$')
  const N = parseInt(n, 16)
  const blockSize = parseInt(v, 16)
  const keyLength = (pwdHash.length / 2)
  const parallelization = parseInt(r, 16)
  const encPwdHash = await _encrypt({
    blockSize,
    N,
    keyLength,
    parallelization,
    password,
    salt: saltOnly,
  })
  const hashesMatching = !!(encPwdHash === pwdHash)

  return hashesMatching;
}

