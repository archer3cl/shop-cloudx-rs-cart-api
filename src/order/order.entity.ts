import { Cart } from 'src/cart/cart.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum OrderStatus {
  OPEN = 'OPEN',
  APPROVED = 'APPROVED',
  CONFIRMED = 'CONFIRMED',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({
    type: 'jsonb',
  })
  address: Address;

  @Column({
    type: 'jsonb',
  })
  statusHistory: StatusHistory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export interface Address {
  address: string;
  comment: string;
  firstName: string;
  lastName: string;
}

export interface StatusHistory {
  comment: string;
  status: OrderStatus;
  timestamp: number;
}
