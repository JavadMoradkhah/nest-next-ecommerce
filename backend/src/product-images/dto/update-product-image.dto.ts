import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateProductImageDto {
  @IsBoolean()
  @ApiProperty()
  isMain: boolean;
}
