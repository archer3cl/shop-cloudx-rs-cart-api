import { Address, StatusHistory } from '../order.entity';

export type OrderFE = {
  id: string;
  items: ItemOrder[];
  address: Address;
  statusHistory: StatusHistory[];
};

interface ItemOrder {
  productId: string;
  count: number;
}
