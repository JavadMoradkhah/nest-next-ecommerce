import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';
import ErrorMessages from 'src/enums/error-messages.enum';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findAllParents() {
    const categories = await this.categoriesRepository.find({
      select: {
        id: true,
        name: true,
        slug: true,
      },
      relations: {
        children: true,
      },
      where: { parent: IsNull() },
      order: {
        name: 'ASC',
      },
    });

    return categories;
  }

  async findAll() {
    const categories = await this.categoriesRepository.find({
      select: {
        id: true,
        name: true,
        slug: true,
        parent: {
          id: true,
          name: true,
        },
      },
      relations: {
        parent: true,
      },
      order: {
        name: 'ASC',
      },
    });

    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(ErrorMessages.CATEGORY_NOT_FOUND);
    }

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    let parent: Category = null;

    if (createCategoryDto.parent) {
      parent = await this.categoriesRepository.findOne({
        where: { id: createCategoryDto.parent },
      });

      if (!parent) {
        throw new BadRequestException(ErrorMessages.PARENT_CATEGORY_NOT_FOUND);
      }
    }

    const exists = await this.categoriesRepository.exist({
      where: { slug: createCategoryDto.slug },
    });

    if (exists) {
      throw new ConflictException(ErrorMessages.CATEGORY_ALREADY_EXISTS);
    }

    const category = this.categoriesRepository.create({
      name: createCategoryDto.name,
      slug: createCategoryDto.slug,
      parent: parent,
    });

    await this.categoriesRepository.save(category);

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let parent: Category = null;

    const category = await this.categoriesRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(ErrorMessages.CATEGORY_NOT_FOUND);
    }

    if (updateCategoryDto.parent) {
      parent = await this.categoriesRepository.findOne({
        where: { id: updateCategoryDto.parent },
      });

      if (!parent) {
        throw new BadRequestException(ErrorMessages.PARENT_CATEGORY_NOT_FOUND);
      }

      category.parent = parent;
    }

    if (updateCategoryDto.slug) {
      const exists = await this.categoriesRepository.exist({
        where: { slug: updateCategoryDto.slug },
      });

      if (exists) {
        throw new ConflictException(ErrorMessages.CATEGORY_ALREADY_EXISTS);
      }

      category.slug = updateCategoryDto.slug;
    }

    if (updateCategoryDto.name) category.name = updateCategoryDto.name;

    return await this.categoriesRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(ErrorMessages.CATEGORY_NOT_FOUND);
    }

    return await this.categoriesRepository.remove(category);
  }
}
