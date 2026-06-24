import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productName!: string;

  @Column()
  costPrice!: number;

  @Column()
  sellingPrice!: number;

  @Column()
  quantityAvailable!: number;

  @Column()
  category!: string;

  @Column()
  description!: string;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy!: User['id'];
}

// [
//   {
//     "id": "prod_90112",
//     "productName": "Wireless Mechanical Keyboard",
//     "costPrice": 3200.00,
//     "sellingPrice": 4999.00,
//     "QtyAvailable": 45,
//     "category": "Electronics",
//     "description": "Compact 75% layout keyboard with hot-swappable switches and RGB backlighting.",
//     "createdBy": "admin_user_01"
//   },
//   {
//     "id": "prod_90113",
//     "productName": "Ergonomic Desk Chair",
//     "costPrice": 7500.00,
//     "sellingPrice": 11999.00,
//     "QtyAvailable": 12,
//     "category": "Furniture",
//     "description": "High-back mesh chair with adjustable lumbar support and 3D armrests.",
//     "createdBy": "admin_user_01"
//   },
//   {
//     "id": "prod_90114",
//     "productName": "Stainless Steel Water Bottle",
//     "costPrice": 450.00,
//     "sellingPrice": 899.00,
//     "QtyAvailable": 120,
//     "category": "Kitchenware",
//     "description": "Vacuum-insulated 1-litre bottle that keeps drinks cold for 24 hours.",
//     "createdBy": "manager_user_05"
//   }
// ]
