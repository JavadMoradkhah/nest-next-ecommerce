import * as path from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { ColorsModule } from './colors/colors.module';
import { Color } from './colors/entities/color.entity';
import { SizesModule } from './sizes/sizes.module';
import { Size } from './sizes/entities/size.entity';
import { CountriesModule } from './countries/countries.module';
import { Country } from './countries/entities/country.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductImage } from './product-images/entities/product-image.entity';
import { UploadsModule } from './uploads/uploads.module';
import { Upload } from './uploads/entities/upload.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Category, Color, Size, Country, Product, Upload, ProductImage],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    CategoriesModule,
    ColorsModule,
    SizesModule,
    CountriesModule,
    ProductsModule,
    ProductImagesModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
