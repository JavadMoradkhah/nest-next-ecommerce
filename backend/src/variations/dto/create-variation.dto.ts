import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateVariationDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  product: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  color?: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  size?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Max(9_999_999.99)
  @IsOptional()
  @ApiProperty({ required: false })
  price?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(32_000) // The maximum acceptable value for the smallint data type in the Postgres database is: 32767
  @ApiProperty()
  numberInStock: number;
}
