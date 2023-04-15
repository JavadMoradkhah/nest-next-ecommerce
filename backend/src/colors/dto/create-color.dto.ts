import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 7)
  @Matches(/^#[A-Fa-f0-9]+$/)
  @ApiProperty()
  code: string;
}
