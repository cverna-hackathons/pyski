import * as Debugger from 'debug';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import {
  Connection,
  createConnection,
} from 'typeorm';

const debug = Debugger('pyski:database');

dotenv.config();

export async function connect(): Promise<Connection> {
  debug('connecting db');
  const connection: Connection = await createConnection();
  debug('connected');
  return connection;
}