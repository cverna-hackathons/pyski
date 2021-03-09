import * as path from 'path';
import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver
} from 'typeorm-fixtures-cli/dist';
import { getRepository } from 'typeorm';
import { connect } from '../index'

const loadFixtures = async () => {
  let connection;
  console.info('loadFixtures')
  connection = await connect();
  console.info('loadFixtures connected')
  const loader = new Loader();
  loader.load(path.resolve(__dirname));

  const resolver = new Resolver();
  const fixtures = resolver.resolve(loader.fixtureConfigs);
  const builder = new Builder(connection, new Parser());

  for (const fixture of fixturesIterator(fixtures)) {
    const entity: any = await builder.build(fixture);
    await getRepository(entity.constructor.name).save(entity);
  }
  if (connection) {
    await connection.close();
  }
};

(async function() {
  console.info('Fixtures were successfully loaded.')
  await loadFixtures()
  console.info('Fixtures were successfully loaded.')
})()
