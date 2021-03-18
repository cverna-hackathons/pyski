import * as Debugger from 'debug';
import { strictEqual } from 'assert';
import { encrypt, verify } from './password';

const debug = Debugger('pyski:test:util:password');

describe(``, () => {
  const pwd = 'hello';
  let encrypted: string;

  it(`should encrypt password`, async () => {
    encrypted = await encrypt(pwd);
    debug('encrypted', encrypted);
    strictEqual(encrypted.length > 128, true);
  });
  it(`should fail to verify against incorrect password`, async () => {
    const matching = await verify(encrypted, 'world');
    debug('incorrect matches', matching);
    strictEqual(matching, false);
  });
  it(`should verify encrypted password`, async () => {
    const matching = await verify(encrypted, pwd);
    debug('correct matches', matching);
    strictEqual(matching, true);
  });
});
