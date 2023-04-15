import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { DatabaseModule } from './db.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import config from './config';
import { User } from './modules/users/entities/user.entity';
import { Customer } from './modules/users/entities/customer.entity';
import { Product } from './modules/products/entities/product.entity';
import { Category } from './modules/products/entities/category.entity';
import { Brand } from './modules/products/entities/brand.entity';
import { Order } from './modules/orders/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Brand, User, Category, Customer, Order, Product],
      synchronize: true,
    }),
    ProductsModule,
    OrdersModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
