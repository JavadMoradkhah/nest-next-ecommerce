import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  product: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  image: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isMain?: boolean;
}
