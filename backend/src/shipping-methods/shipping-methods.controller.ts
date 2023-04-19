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
import { ShippingMethodsService } from './shipping-methods.service';
import { CreateShippingMethodDto, UpdateShippingMethodDto } from './dto';

@ApiTags('shipping-methods')
@Controller('shipping-methods')
export class ShippingMethodsController {
  constructor(
    private readonly shippingMethodServices: ShippingMethodsService,
  ) {}

  @Get()
  findAll() {
    return this.shippingMethodServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.shippingMethodServices.findOne(id);
  }

  @Post()
  create(@Body() createShippingMethodDto: CreateShippingMethodDto) {
    return this.shippingMethodServices.create(createShippingMethodDto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateShippingMethodDto: UpdateShippingMethodDto,
  ) {
    return this.shippingMethodServices.update(id, updateShippingMethodDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.shippingMethodServices.remove(id);
  }
}
