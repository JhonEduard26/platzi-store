import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import config from './config';
import { Order } from './modules/orders/entities/order.entity';
import { Product } from './modules/products/entities/product.entity';
import { Brand } from './modules/products/entities/brand.entity';
import { Customer } from './modules/users/entities/customer.entity';
import { User } from './modules/users/entities/user.entity';
import { Category } from './modules/products/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'platzi-store',
      synchronize: false,
      logging: true,
      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: true,
      entities: [Order, Product, Brand, Customer, User, Category],
    }),
    ProductsModule,
    OrdersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
