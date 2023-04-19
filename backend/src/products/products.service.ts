import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import ErrorMessages from 'src/enums/error-messages.enum';
import { CreateProductDto, UpdateProductDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findAll() {
    const products = await this.productsRepo.find({
      select: {
        id: true,
        title: true,
        price: true,
        discount: true,
        category: {
          id: true,
          name: true,
          slug: true,
        },
        images: {
          id: true,
          image: {
            imageUrl: true,
            alt: true,
          },
          isMain: true,
        },
      },
      relations: {
        category: true,
        images: {
          image: true,
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return products;
  }

  async findOne(id: string, includeRelations = false) {
    const product = await this.productsRepo.findOne({
      where: {
        id,
      },
      ...(includeRelations && {
        relations: {
          category: true,
          images: {
            image: true,
          },
        },
      }),
    });

    if (!product) {
      throw new NotFoundException(ErrorMessages.PRODUCT_NOT_FOUND);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const { title, description, price, discount } = createProductDto;

    const category = await this.categoriesService.findOne(
      createProductDto.category,
    );

    const product = await this.productsRepo.create({
      category,
      title,
      description,
      price,
      discount,
    });

    return await this.productsRepo.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let category: Category = null;

    const { title, description, price, discount } = updateProductDto;

    const product = await this.findOne(id);

    if (updateProductDto.category) {
      category = await this.categoriesService.findOne(
        updateProductDto.category,
      );

      product.category = category;
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (discount !== undefined) product.discount = discount;

    return await this.productsRepo.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productsRepo.remove(product);
  }
}
