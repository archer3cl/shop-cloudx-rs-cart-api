import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

export enum CartStatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: CartStatus,
    default: CartStatus.OPEN,
  })
  status: CartStatus;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items: CartItem[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column()
  product_id: string;

  @Column()
  count: number;

  @Column({
    type: 'jsonb',
  })
  product: Product;
}

export interface Product {
  id?: string;
  title: string;
  description: string;
  number: string;
}
