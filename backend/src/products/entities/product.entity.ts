import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, Min, IsBoolean } from 'class-validator';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  nome: string;

  @Field()
  @IsNotEmpty()
  descricao: string;

  @Field(() => Float)
  @IsInt()
  @Min(0)
  valor: number;

  @Field()
  @IsBoolean()
  disponivel: boolean;

  @Field()
  criado_em: Date;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Int)
  userId: number;
}
