import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, userId: number): Promise<Product> {
    try {
      console.log('Creating product with data:', { ...createProductDto, userId });
      
      if (!userId) {
        throw new UnauthorizedException('User ID is required to create a product');
      }

      const product = await this.prisma.product.create({
        data: {
          ...createProductDto,
          disponivel: createProductDto.disponivel ?? true,
          user: { connect: { id: userId } }
        }
      });

      console.log('Product created successfully:', product);
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }
      }
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll(userId: number): Promise<Product[]> {
    const where: Prisma.ProductWhereInput = {
      userId
    };

    return this.prisma.product.findMany({
      where,
      orderBy: {
        valor: 'asc'
      }
    });
  }

  async findOne(id: number, userId: number): Promise<Product> {
    const where: Prisma.ProductWhereInput = {
      id,
      userId
    };

    const product = await this.prisma.product.findFirst({ where });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found or you don't have access to it`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, userId: number): Promise<Product> {
    await this.findOne(id, userId);
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto
    });
  }

  async remove(id: number, userId: number): Promise<Product> {
    await this.findOne(id, userId);
    return this.prisma.product.delete({
      where: { id }
    });
  }
}
