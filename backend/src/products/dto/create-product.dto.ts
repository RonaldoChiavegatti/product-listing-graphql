import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field({ defaultValue: true })
  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;
}
