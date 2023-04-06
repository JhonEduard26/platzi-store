import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
