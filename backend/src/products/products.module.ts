import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ProductsService, ProductsResolver, PrismaService]
})
export class ProductsModule {}
