import { Injectable } from '@nestjs/common';
import { CartItem, CartStatuses } from '../models/index'
import { v4 } from 'uuid';
import { Cart } from '../models';
import { count } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItemEntity } from 'src/entities/cart-item.entity';
import { CartEntity } from 'src/entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}
  private userCarts: Record<string, Cart> = {};
  findByUserId(userId: string): Cart {
    return this.userCarts[ userId ];
  }
  createByUserId(userId: string) {
    const id = v4() as string;
    const userCart = {
      id: id,
      // items: [],
      user_id: userId,
      created_at: new Date().toISOString() as unknown as Date,
      updated_at: new Date().toISOString() as unknown as Date,
      status: CartStatuses.OPEN,
    };
    // this.userCarts[ userId ] = userCart;
    return userCart;
  }
  async findOrCreateByUserId(userId: string): Promise<CartEntity> {
    // const userCart = this.findByUserId(userId);
    const userCart = await this.cartRepository.findOne({
      where: { user_id: userId },
    });
    if (userCart) {
      return userCart;
    }
    return this.createByUserId(userId);
    // return this.createByUserId(userId);
  }
  async updateByUserId(userId: string, items: CartItem[]): Promise<CartEntity> {
    // const { id, ...rest } = await this.findOrCreateByUserId(userId);
    // const updatedCart = {
    //   id,
    //   ...rest,
    //   items: [ ...items ],
    // }
    const cartForUpdate = await this.findOrCreateByUserId(userId);
    const productId = items[0].product.id
    const cartItems = await this.cartItemRepository.findOne({
      where: { product_id: productId, cart_id: cartForUpdate.id},
    });
    if (cartItems) {
      let countProducts = +cartItems.count + 1;
      cartItems.count = countProducts;
      await this.cartItemRepository.save(cartItems);
    } else {
      const newCartItemForSave = {
        cart_id: cartForUpdate.id,
        product_id: productId,
        count: 1
      }
      await this.cartItemRepository.save(newCartItemForSave);
    }
    if (cartForUpdate) {
      cartForUpdate.updated_at = new Date().toISOString() as unknown as Date,
      await this.cartRepository.save(cartForUpdate);
    }
    // this.userCarts[ userId ] = { ...updatedCart };
    return {...cartForUpdate};
  }
  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }
}
