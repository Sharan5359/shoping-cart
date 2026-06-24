import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashService } from '../common/hashing/hash';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashService],
  controllers: [UsersController],
  providers: [UsersService, TypeOrmModule, HashService],
  exports: [UsersService],
})
export class UsersModule {}
