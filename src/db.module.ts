import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';

import config from './config';

@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, host, password, port, user } = configService.postgres;
        const client = new Client({
          database: dbName,
          host,
          password,
          port,
          user,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}
