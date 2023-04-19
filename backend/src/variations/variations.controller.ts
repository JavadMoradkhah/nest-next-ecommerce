import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VariationsService } from './variations.service';
import { CreateVariationDto, UpdateVariationDto } from './dto';

@ApiTags('variations')
@Controller('variations')
export class VariationsController {
  constructor(private readonly variationsService: VariationsService) {}

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.variationsService.findOne(id);
  }

  @Post()
  create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationsService.create(createVariationDto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateVariationDto: UpdateVariationDto,
  ) {
    return this.variationsService.update(id, updateVariationDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.variationsService.remove(id);
  }
}
