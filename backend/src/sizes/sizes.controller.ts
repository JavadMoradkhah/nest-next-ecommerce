import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SizesService } from './sizes.service';
import { CreateSizeDto, UpdateSizeDto } from './dto';

@ApiTags('sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Get()
  findAll() {
    return this.sizesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.sizesService.findOne(id);
  }

  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSizeDto: UpdateSizeDto,
  ) {
    return this.sizesService.update(id, updateSizeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.sizesService.remove(id);
  }
}
