import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from 'src/modules/orders/entities/order.entity';
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from 'src/modules/orders/dtos/orders.dtos';

@Injectable()
export class OrdersService {
  private counterId = 1;
  private orders: Order[] = [];

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order {
    const order = this.orders.find((item) => item.id === id);

    if (!order) throw new NotFoundException(`Venta ${id} no fue encontrada`);

    return order;
  }

  create(payload: CreateOrderDTO): void {
    this.counterId++;

    const newOrder = {
      id: this.counterId,
      ...payload,
    };

    this.orders.push(newOrder);
  }

  update(id: number, body: UpdateOrderDTO): void {
    const order = this.findOne(id);

    if (order) {
      const orderIndex = this.orders.findIndex((item) => item.id === id);
      this.orders[orderIndex] = {
        id,
        ...order,
        ...body,
      };
    }
  }

  delete(id: number): void {
    const order = this.findOne(id);

    if (order) {
      const orderIndex = this.orders.findIndex((item) => item.id === id);
      this.orders.splice(orderIndex, 1);
    }
  }
}
