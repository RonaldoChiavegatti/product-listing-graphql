import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseGuards, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Product)
  async createProduct(
    @Args('createProductDto') createProductDto: CreateProductDto,
    @Context() context
  ) {
    console.log('Resolver: Creating product with context:', { user: context.req.user });
    
    if (!context.req.user || !context.req.user.id) {
      throw new Error('User not authenticated or user ID not found');
    }

    const userId = context.req.user.id;
    return this.productsService.create(createProductDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Product], { name: 'products' })
  findAll(@Context() context) {
    const userId = context.req.user.id;
    return this.productsService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() context
  ) {
    const userId = context.req.user.id;
    return this.productsService.findOne(id, userId);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductDto') updateProductDto: UpdateProductDto,
    @Args('id', { type: () => Int }) id: number,
    @Context() context
  ) {
    const userId = context.req.user.id;
    return this.productsService.update(id, updateProductDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Product)
  removeProduct(
    @Args('id', { type: () => Int }) id: number,
    @Context() context
  ) {
    const userId = context.req.user.id;
    return this.productsService.remove(id, userId);
  }
}
