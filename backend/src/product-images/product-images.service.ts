import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';
import ErrorMessages from 'src/enums/error-messages.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductImageDto, UpdateProductImageDto } from './dto';
import { ProductsService } from 'src/products/products.service';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImagesRepo: Repository<ProductImage>,
    private readonly productsService: ProductsService,
    private readonly uploadsService: UploadsService,
  ) {}

  async findOne(id: string) {
    const productImage = await this.productImagesRepo.findOneBy({ id });

    if (!productImage) {
      throw new NotFoundException(ErrorMessages.PRODUCT_IMAGE_NOT_FOUND);
    }

    return productImage;
  }

  async create(createImageDto: CreateProductImageDto) {
    const product = await this.productsService.findOne(createImageDto.product);

    const image = await this.uploadsService.findOne(createImageDto.image);

    // Check whether the uploaded image is marked as the product main image or not
    if (createImageDto.isMain) {
      // Find the product's main image to unmark it as the main image
      const mainProductImage = await this.productImagesRepo.findOneBy({
        product: {
          id: product.id,
        },
        isMain: true,
      });

      if (mainProductImage) {
        mainProductImage.isMain = false;
        await this.productImagesRepo.save(mainProductImage);
      }
    }

    const productImage = this.productImagesRepo.create({
      product: {
        id: product.id,
      },
      image: {
        id: image.id,
      },
      isMain: createImageDto.isMain,
    });

    return await this.productImagesRepo.save(productImage);
  }

  async update(id: string, { isMain }: UpdateProductImageDto) {
    const image = await this.findOne(id);

    image.isMain = isMain;

    return await this.productImagesRepo.save(image);
  }

  async remove(id: string) {
    const productImage = await this.findOne(id);
    await this.productImagesRepo.remove(productImage);
  }
}
