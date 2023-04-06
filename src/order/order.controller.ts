import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { BasicAuthGuard } from '../auth';
import { OrderFE, OrderService } from '.';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from '../cart';
import { CartStatus } from 'src/cart/cart.entity';
import { Address } from './order.entity';

@Controller('api/profile/order')
export class OrderController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  @UseGuards(BasicAuthGuard)
  @Get(':orderId')
  async findUserOrder(
    @Req() req: AppRequest,
    @Param('orderId') orderId: string,
  ) {
    const order = await this.orderService.findByUserId(
      getUserIdFromRequest(req),
      orderId,
    );

    const { cart, user, ...feOrder } = order;
    const items = cart.items.map((item) => ({
      count: item.count,
      productId: item.product_id,
    }));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { ...feOrder, items },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserOrders(@Req() req: AppRequest) {
    const orders = await this.orderService.findAllByUserId(
      getUserIdFromRequest(req),
    );

    const feOrders = orders.map((order) => {
      const { cart, user, ...rest } = order;
      const items = cart.items.map((item) => ({
        count: item.count,
        productId: item.product_id,
      }));
      return { ...rest, items };
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: feOrders,
    };
  }

  @UseGuards(BasicAuthGuard)
  @Put()
  async checkout(@Req() req: AppRequest, @Body() body: Address) {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length && cart.status === CartStatus.OPEN)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    await this.orderService.create(body, cart);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }
}
