import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from '../common/hashing/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashService.hashPassword(
      createUserDto.password,
    );
    const user = this.user.create(createUserDto);
    return this.user.save(user);
  }

  async findOne(email: string) {
    return await this.user.findOne({ where: { email } });
  }

  async findBy(id: number) {
    return await this.user.findBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.user.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    return await this.user.save(user);
  }

  async remove(id: number) {
    const user = await this.user.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.user.remove(user);
  }
}
