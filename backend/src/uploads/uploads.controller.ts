import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Body,
  UseFilters,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileType,
  StorageUnit,
  getUploadOptions,
  validateFilePipe,
} from 'src/utils/file-storage';
import { CreateUploadDto, UpdateUploadDto } from './dto';
import { UploadExceptionFilter } from 'src/utils/upload-exception.filter';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Get()
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.uploadsService.findOne(id);
  }

  @Post('images')
  @UseInterceptors(FileInterceptor('file', getUploadOptions(StorageUnit.IMAGE)))
  @UseFilters(UploadExceptionFilter)
  @ApiConsumes('multipart/form-data')
  createImage(
    @UploadedFile(validateFilePipe(1024 ** 2 * 2, FileType.IMAGE_JPEG))
    image: Express.Multer.File,
    @Body() createUploadDto: CreateUploadDto,
  ) {
    return this.uploadsService.createImage(image, createUploadDto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUploadDto: UpdateUploadDto,
  ) {
    return this.uploadsService.update(id, updateUploadDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.uploadsService.remove(id);
  }
}
