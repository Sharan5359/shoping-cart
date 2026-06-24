import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly product: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    Number(createProductDto.createdBy);
    const product = this.product.create(createProductDto);
    return await this.product.save(product);
  }

  async findAll() {
    return await this.product.find();
  }

  async findOne(id: number) {
    return await this.product.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.product.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, updateProductDto);
    return await this.product.save(product);
  }

  async remove(id: number) {
    const product = await this.product.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return await this.product.remove(product);
  }
}
