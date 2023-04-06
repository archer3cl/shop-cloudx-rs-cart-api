import { Product } from '../cart.entity';

export type CartItemFE = {
  product: Product;
  count: number;
};
