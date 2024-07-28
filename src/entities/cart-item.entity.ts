import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryColumn('uuid')
  cart_id: string;

  @PrimaryColumn('uuid')
  product_id: string;

  @Column('int')
  count: number;

  @ManyToOne(() => CartEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: CartEntity;
}
