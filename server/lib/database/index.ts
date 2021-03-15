import * as Debugger from 'debug';
import 'reflect-metadata';
import {
  Connection,
  createConnection,
} from 'typeorm';
import '../config';

const debug = Debugger('pyski:database');

export async function connect(): Promise<Connection> {
  debug('connecting db');
  const connection: Connection = await createConnection();
  debug('connected');
  return connection;
}