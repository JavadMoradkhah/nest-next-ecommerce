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
      entities: [Category, Color, Size],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    CategoriesModule,
    ColorsModule,
    SizesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
