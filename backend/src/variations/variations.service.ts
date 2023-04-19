import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { Variation } from './entities/variation.entity';
import { CreateVariationDto, UpdateVariationDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import ErrorMessages from 'src/enums/error-messages.enum';
import { ProductsService } from 'src/products/products.service';
import { ColorsService } from 'src/colors/colors.service';
import { SizesService } from 'src/sizes/sizes.service';
import { Color } from 'src/colors/entities/color.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class VariationsService {
  constructor(
    @InjectRepository(Variation)
    private readonly variationsRepo: Repository<Variation>,
    private readonly productsService: ProductsService,
    private readonly colorsService: ColorsService,
    private readonly sizesService: SizesService,
  ) {}

  async findOne(id: string) {
    const variation = await this.variationsRepo.findOneBy({ id });

    if (!variation) {
      throw new NotFoundException(ErrorMessages.VARIATION_NOT_FOUND);
    }

    return variation;
  }

  async create(createVariationDto: CreateVariationDto) {
    let color: Color = null;
    let size: Size = null;

    const product = await this.productsService.findOne(
      createVariationDto.product,
    );

    if (createVariationDto.color) {
      color = await this.colorsService.findOne(createVariationDto.color);
    }

    if (createVariationDto.size) {
      size = await this.sizesService.findOne(createVariationDto.size);
    }

    const exists = await this.checkVariationExists(
      product.id,
      color?.id || null,
      size?.id || null,
    );

    if (exists) {
      throw new ConflictException(ErrorMessages.VARIATION_ALREADY_EXISTS);
    }

    const variation = this.variationsRepo.create({
      numberInStock: createVariationDto.numberInStock,
      price: createVariationDto.price || null,
      product: {
        id: product.id,
      },
      ...(color && {
        color: {
          id: color.id,
        },
      }),
      ...(size && {
        size: {
          id: size.id,
        },
      }),
    });

    return await this.variationsRepo.save(variation);
  }

  async update(id: string, updateVariationDto: UpdateVariationDto) {
    const variation = await this.findOne(id);

    let product: Product = null;
    let color: Color = null;
    let size: Size = null;

    if (updateVariationDto.product) {
      product = await this.productsService.findOne(updateVariationDto.product);

      variation.product.id = product.id;
    }

    if (updateVariationDto.color) {
      color = await this.colorsService.findOne(updateVariationDto.color);

      variation.color.id = color.id;
    }

    if (updateVariationDto.size) {
      size = await this.sizesService.findOne(updateVariationDto.size);

      variation.size.id = size.id;
    }

    const exists = await this.checkVariationExists(
      product.id,
      color?.id,
      size?.id,
    );

    if (exists) {
      throw new ConflictException(ErrorMessages.VARIATION_ALREADY_EXISTS);
    }

    return await this.variationsRepo.save(variation);
  }

  async remove(id: string) {
    const variation = await this.findOne(id);
    await this.variationsRepo.remove(variation);
  }

  async checkVariationExists(
    productId: string,
    colorId?: string,
    sizeId?: string,
  ) {
    return await this.variationsRepo.exist({
      where: {
        product: {
          id: productId,
        },
        color: {
          id: colorId || IsNull(),
        },
        size: {
          id: sizeId || IsNull(),
        },
      },
    });
  }
}
