/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@Controller('cart')
@ApiBearerAuth('authorization')
@UseGuards(AuthGuard, RoleGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Req() req: any, @Body() createCartDto: CreateCartDto) {
    createCartDto.user = Number(req.user.sub);
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll(@Req() req: any) {
    const userId = Number(req.user.sub);
    return this.cartService.findAll(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Param('action') action: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(+id, updateCartDto, action);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
