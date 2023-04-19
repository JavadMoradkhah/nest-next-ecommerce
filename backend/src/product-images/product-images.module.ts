import { Module } from '@nestjs/common';
import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { ProductsModule } from 'src/products/products.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImage]),
    ProductsModule,
    UploadsModule,
  ],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
