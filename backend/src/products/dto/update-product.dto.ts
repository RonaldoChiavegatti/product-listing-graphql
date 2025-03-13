import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class UpdateProductDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descricao?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  valor?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;
}
