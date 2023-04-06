import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart as CartEntity, CartItem, CartStatus } from '../cart.entity';
import { CartItemFE } from '../models';
import { User } from 'src/users/users.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartsRepository: Repository<CartEntity>,
    @InjectRepository(CartItem)
    private itemsRepository: Repository<CartItem>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByUserId(userId: string): Promise<CartEntity> {
    return this.cartsRepository.findOne({
      where: { status: CartStatus.OPEN, user: { email: userId } },
      relations: {
        items: true,
        user: true,
      },
    });
  }

  findItemByUserId(userId: string, productId: string): Promise<CartItem> {
    return this.itemsRepository.findOne({
      where: {
        cart: { status: CartStatus.OPEN, user: { email: userId } },
        product_id: productId,
      },
      relations: {
        cart: true,
      },
    });
  }

  async create(userId: string) {
    const user = await this.usersRepository.findOneBy({ email: userId });
    const cart = new CartEntity();
    cart.user = user;
    return this.cartsRepository.save(cart);
  }

  async updateByUserId(userId: string, item: CartItemFE) {
    const { id: productId, ...product } = item.product;
    let dbItem: Partial<CartItem> = await this.findItemByUserId(
      userId,
      productId,
    );
    if (item.count > 0) {
      if (!dbItem) {
        const cart = await this.findByUserId(userId);
        if (!cart) return;
        dbItem = { cart: cart, product_id: productId };
      }
      dbItem.count = item.count;
      dbItem.product = product;
      await this.itemsRepository.save(dbItem);
      return;
    }

    if (dbItem) await this.itemsRepository.remove(dbItem as CartItem);
  }
}
