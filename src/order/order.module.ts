import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services';
import { Order } from './order.entity';
import { CartModule } from 'src/cart/cart.module';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CartModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
