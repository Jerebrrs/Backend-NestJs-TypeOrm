import { envs } from 'src/config/envs';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: envs.dbHost,
        port: envs.dbPort,
        username: envs.dbUsername,
        password: envs.dbPassword,
        database: envs.dbName,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
