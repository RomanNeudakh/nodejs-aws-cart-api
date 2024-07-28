import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';
import { CartStatuses } from 'src/cart/models/index';
@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('date')
  created_at: Date;

  @Column('date')
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: CartStatuses,
  })
  status: CartStatuses;
}