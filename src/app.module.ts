import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Client } from 'pg';

import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import config from './config';

const client = new Client({
  database: 'platzi-store',
  host: 'localhost',
  password: '1234',
  port: 5432,
  user: 'postgres',
});

client.connect();

client.query('SELECT * FROM tasks', (err, res) => {
  console.error(err);

  console.log(res.rows);
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    ProductsModule,
    OrdersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
