import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const client = new Client({
  database: 'platzi-store',
  host: 'localhost',
  password: '1234',
  port: 5432,
  user: 'postgres',
});
client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}
