import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^([0-9]+|((X+)?S|M|[0-9]?(X+)?L))$/)
  @ApiProperty()
  value: string;
}
