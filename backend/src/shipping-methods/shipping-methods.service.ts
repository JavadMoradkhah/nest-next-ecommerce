import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShippingMethod } from './entity/shipping-method.entity';
import { InjectRepository } from '@nestjs/typeorm';
import ErrorMessages from 'src/enums/error-messages.enum';
import { CreateShippingMethodDto, UpdateShippingMethodDto } from './dto';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodsRepo: Repository<ShippingMethod>,
  ) {}

  async findAll() {
    const shippingMethods = await this.shippingMethodsRepo.find();
    return shippingMethods;
  }

  async findOne(id: string) {
    const shippingMethod = await this.shippingMethodsRepo.findOneBy({ id });

    if (!shippingMethod) {
      throw new NotFoundException(ErrorMessages.SHIPPING_METHOD_NOT_FOUND);
    }

    return shippingMethod;
  }

  async create({ name, price }: CreateShippingMethodDto) {
    const exists = await this.shippingMethodsRepo.findOneBy({
      name,
    });

    if (exists) {
      throw new ConflictException(ErrorMessages.SHIPPING_METHOD_ALREADY_EXISTS);
    }

    const shippingMethod = this.shippingMethodsRepo.create({
      name,
      price,
    });

    return await this.shippingMethodsRepo.save(shippingMethod);
  }

  async update(id: string, { name, price }: UpdateShippingMethodDto) {
    const shippingMethod = await this.findOne(id);

    if (name) shippingMethod.name = name;
    if (price !== undefined) shippingMethod.price = price;

    return await this.shippingMethodsRepo.save(shippingMethod);
  }

  async remove(id: string) {
    const shippingMethod = await this.findOne(id);
    await this.shippingMethodsRepo.remove(shippingMethod);
  }
}
