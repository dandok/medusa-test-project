import { DataSource } from 'typeorm';
import path from 'path';
import loadConfig from '@medusajs/medusa/dist/loaders/config';

let connection: DataSource;

export const testDatabase = {
  setup: async (): Promise<void> => {
    const rootDirectory = process.cwd();
    const configModule = loadConfig(rootDirectory);
    const entitiesPath = path.join(__dirname, '..', 'models', '**', '*.*');
    const migrationsPath = path.join(__dirname, '..', 'migrations', '**', '*.*');
    const databaseUrl = 'postgres://postgres:postgres@localhost:5432/medusa-db-448rx';

    connection = await new DataSource({
      type: 'postgres',
      url: databaseUrl,
      entities: [
        'node_modules/@medusajs/medusa/dist/models/*.js',
        entitiesPath,
      ],
      migrations: [migrationsPath],
      synchronize: false,
      dropSchema: false,
    });

    await connection.initialize()
  },

  destroy: async (): Promise<void> => {
    if (connection) {
      await connection.destroy();
    }
  },

  getConnection: (): DataSource => {
    return connection;
  },
};