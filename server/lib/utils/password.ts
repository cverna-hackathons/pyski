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

const getEncryptedPassword = promisify((
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
  const input: EncryptionInput = {
    blockSize: 1,
    keyLength: 64,
    parallelization: 1,
    password,
    salt: 'full',
  };
  const pwdHash = await getEncryptedPassword(input);

  // return [ pwdHash ]
}

export async function verify(hash: string, password: string) {
  const [ n, v, r, saltOnly, pwdHash ] = hash.split('$')
  const N = parseInt(n, 16)
  const blockSize = parseInt(v, 16)
  const keyLength = (pwdHash.length / 2)
  const passwordText = `${password}`
  const parallelization = parseInt(r, 16)
  const encPwdHash = await getEncryptedPassword({
    blockSize,
    N,
    keyLength,
    parallelization,
    password: passwordText,
    salt: saltOnly,
  })
  const hashesMatching = !!(encPwdHash === pwdHash)

  return hashesMatching;
}

