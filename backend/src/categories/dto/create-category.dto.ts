import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  slug: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  parent?: string;
}
