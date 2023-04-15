import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { Repository } from 'typeorm';
import ErrorMessages from 'src/enums/error-messages.enum';
import { CreateSizeDto, UpdateSizeDto } from './dto';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size) private readonly sizeRepo: Repository<Size>,
  ) {}

  async findAll() {
    const sizes = await this.sizeRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return sizes;
  }

  async findOne(id: string) {
    const size = await this.sizeRepo.findOneBy({ id });

    if (!size) {
      throw new NotFoundException(ErrorMessages.SIZE_NOT_FOUND);
    }

    return size;
  }

  async create(createSizeDto: CreateSizeDto) {
    const exists = await this.sizeRepo.findOneBy({
      value: createSizeDto.value,
    });

    if (exists) {
      throw new ConflictException(ErrorMessages.SIZE_ALREADY_EXISTS);
    }

    const size = this.sizeRepo.create({
      value: createSizeDto.value,
    });

    return await this.sizeRepo.save(size);
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    const size = await this.findOne(id);

    const exists = await this.sizeRepo.findOneBy({
      value: updateSizeDto.value,
    });

    if (exists) {
      throw new ConflictException(ErrorMessages.SIZE_ALREADY_EXISTS);
    }

    size.value = updateSizeDto.value;

    return await this.sizeRepo.save(size);
  }

  async remove(id: string) {
    const size = await this.findOne(id);
    await this.sizeRepo.remove(size);
  }
}
