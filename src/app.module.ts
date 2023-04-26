import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Brand } from './modules/products/entities/brand.entity';
import { Category } from './modules/products/entities/category.entity';
import { Customer } from './modules/users/entities/customer.entity';
import { Order } from './modules/orders/entities/order.entity';
import { OrderItem } from './modules/orders/entities/order-item.entity';
import { OrdersModule } from './modules/orders/orders.module';
import { Product } from './modules/products/entities/product.entity';
import { ProductsModule } from './modules/products/products.module';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      logging: true,
      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Brand, Category, Customer, Order, OrderItem, Product, User],
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
