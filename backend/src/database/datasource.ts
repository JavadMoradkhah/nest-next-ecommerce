import { Admin } from 'src/admin/entities/admin.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Color } from 'src/colors/entities/color.entity';
import { Country } from 'src/countries/entities/country.entity';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { Product } from 'src/products/entities/product.entity';
import { ShippingMethod } from 'src/shipping-methods/entity/shipping-method.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { Upload } from 'src/uploads/entities/upload.entity';
import { Variation } from 'src/variations/entities/variation.entity';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Category,
    Color,
    Size,
    Country,
    Product,
    Upload,
    ProductImage,
    ShippingMethod,
    Variation,
    Admin,
  ],
  migrations: ['dist/migration/*.js'],
});
