import { PickType } from '@nestjs/swagger';
import { CreateUploadDto } from './create-upload.dto';

export class UpdateUploadDto extends PickType(CreateUploadDto, ['alt']) {}
