// import { Product } from 'src/modules/products/entities/product.entity';
// import { Customer } from 'src/modules/users/entities/customer.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  date: Date;

  // @Column()
  // customer?: Customer;

  // @Column()
  // products?: Product[];
}
