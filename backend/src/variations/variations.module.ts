import { Module } from '@nestjs/common';
import { VariationsController } from './variations.controller';
import { VariationsService } from './variations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variation } from './entities/variation.entity';
import { ProductsModule } from 'src/products/products.module';
import { ColorsModule } from 'src/colors/colors.module';
import { SizesModule } from 'src/sizes/sizes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Variation]),
    ProductsModule,
    ColorsModule,
    SizesModule,
  ],
  controllers: [VariationsController],
  providers: [VariationsService],
})
export class VariationsModule {}
