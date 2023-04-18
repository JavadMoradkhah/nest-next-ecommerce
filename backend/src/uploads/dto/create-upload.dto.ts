import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUploadDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  file: any;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  alt: string;
}
