import { Module } from '@nestjs/common';
import { ShippingMethodsController } from './shipping-methods.controller';
import { ShippingMethodsService } from './shipping-methods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethod } from './entity/shipping-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingMethod])],
  controllers: [ShippingMethodsController],
  providers: [ShippingMethodsService],
})
export class ShippingMethodsModule {}
