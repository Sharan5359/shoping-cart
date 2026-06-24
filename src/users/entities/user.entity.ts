import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  username!: string;

  @Column({ length: 100 })
  password!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;
}
