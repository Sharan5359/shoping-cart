import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart.entity';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItems: Repository<CartItem>,
  ) {}
  async create(createCartDto: CreateCartDto) {
    const cartItem = this.cartItems.create(createCartDto);
    return await this.cartItems.save(cartItem);
  }

  async findAll(userId: number) {
    return await this.cartItems
      .createQueryBuilder('cart')
      .leftJoin('cart.user', 'user')
      .leftJoin('cart.product', 'product')
      .select(['cart.id', 'cart.quantity', 'user.id', 'product.productName'])
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async update(id: number, updateCartDto: UpdateCartDto, action: string) {
    const product = await this.cartItems.findOne({ where: { product: id } });

    if (!product) {
      throw new Error('Product not found');
    }
    if (action === 'decrement') {
      product.quantity -= updateCartDto.quantity || 1;
      if (product.quantity <= 0) {
        return await this.cartItems.remove(product);
      }
    } else if (action === 'increment') {
      product.quantity += updateCartDto.quantity || 1;
    }

    return await this.cartItems.save(product);
  }

  async remove(id: number) {
    const product = await this.cartItems.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return this.cartItems.remove(product);
  }
}
