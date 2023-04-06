import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address, Order, OrderStatus } from '../order.entity';
import { Cart, CartStatus } from 'src/cart/cart.entity';
import { DataSource, Repository } from 'typeorm';
import { CartService } from 'src/cart';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}

  findByUserId(userId: string, orderId: string) {
    return this.ordersRepository.findOne({
      where: { id: orderId, user: { email: userId } },
      relations: { cart: { items: true } },
    });
  }

  findAllByUserId(userId: string) {
    return this.ordersRepository.find({
      where: { user: { email: userId } },
      relations: { cart: { items: true } },
    });
  }

  async create(address: Address, cart: Cart) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      cart.status = CartStatus.ORDERED;
      await queryRunner.manager.save(cart);

      const order = new Order();
      order.address = address;
      order.cart = cart;
      order.user = cart.user;
      order.statusHistory = [
        { comment: '', status: OrderStatus.OPEN, timestamp: +new Date() },
      ];

      const createdOrder = await queryRunner.manager.save(order);
      await queryRunner.commitTransaction();
      return createdOrder;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
