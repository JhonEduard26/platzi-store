import { Product } from 'src/modules/products/entities/product.entity';
import { Customer } from 'src/modules/users/entities/customer.entity';

export class Order {
  id: number;
  total: number;
  date: Date;
  customer?: Customer;
  products?: Product[];
}
