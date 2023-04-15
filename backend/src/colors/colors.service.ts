import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';
import ErrorMessages from 'src/enums/error-messages.enum';
import { CreateColorDto, UpdateColorDto } from './dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color) private readonly colorsRepo: Repository<Color>,
  ) {}

  async findAll() {
    const colors = await this.colorsRepo.find({
      order: {
        name: 'ASC',
      },
    });

    return colors;
  }

  async findOne(id: string) {
    const color = await this.colorsRepo.findOne({
      where: {
        id,
      },
    });

    if (!color) {
      throw new NotFoundException(ErrorMessages.COLOR_NOT_FOUND);
    }

    return color;
  }

  async create(createColorDto: CreateColorDto) {
    const exists = await this.colorsRepo.exist({
      where: [{ name: createColorDto.name }, { code: createColorDto.code }],
    });

    if (exists) {
      throw new ConflictException(ErrorMessages.COLOR_ALREADY_EXISTS);
    }

    const color = this.colorsRepo.create({
      name: createColorDto.name,
      code: createColorDto.code,
    });

    return await this.colorsRepo.save(color);
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    const color = await this.findOne(id);

    const exists = await this.colorsRepo.exist({
      where: [{ name: updateColorDto.name }, { code: updateColorDto.code }],
    });

    if (exists) {
      throw new ConflictException(ErrorMessages.COLOR_ALREADY_EXISTS);
    }

    if (updateColorDto.name) color.name = updateColorDto.name;
    if (updateColorDto.code) color.code = updateColorDto.code;

    return await this.colorsRepo.save(color);
  }

  async remove(id: string) {
    const color = await this.findOne(id);
    await this.colorsRepo.remove(color);
  }
}
