import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import ErrorMessages from 'src/enums/error-messages.enum';
import { CreateCountryDto, UpdateCountryDto } from './dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepo: Repository<Country>,
  ) {}

  async findAll() {
    const countries = await this.countriesRepo.find({
      order: {
        name: 'ASC',
      },
    });

    return countries;
  }

  async findOne(id: string) {
    const country = await this.countriesRepo.findOneBy({ id });

    if (!country) {
      throw new NotFoundException(ErrorMessages.COUNTRY_NOT_FOUND);
    }

    return country;
  }

  private async checkConflicts(name: string): Promise<void | never> {
    const exists = await this.countriesRepo.exist({
      where: { name },
    });

    if (exists) {
      throw new ConflictException(ErrorMessages.COUNTRY_ALREADY_EXISTS);
    }
  }

  async create({ name }: CreateCountryDto) {
    await this.checkConflicts(name);

    const country = this.countriesRepo.create({
      name: name,
    });

    return await this.countriesRepo.save(country);
  }

  async update(id: string, { name }: UpdateCountryDto) {
    const country = await this.findOne(id);

    await this.checkConflicts(name);

    country.name = name;

    return await this.countriesRepo.save(country);
  }

  async remove(id: string) {
    const country = await this.findOne(id);
    await this.countriesRepo.remove(country);
  }
}
