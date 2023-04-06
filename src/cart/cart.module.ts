import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { Cart, CartItem } from './cart.entity';
import { CartService } from './services';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, User])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
