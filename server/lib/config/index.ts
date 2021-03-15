import * as dotenv from 'dotenv';
import { resolve } from 'path';

const configFileName = (
  process.env.CI === 'true'
    ? 'ci.env'
    : '.env'
)

export const config = dotenv.config({
  path: resolve(
    __dirname, `../../${configFileName}`
  ),
});
