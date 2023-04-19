import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from './entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import ErrorMessages from 'src/enums/error-messages.enum';
import { CreateUploadDto } from './dto/create-upload.dto';
import { StorageUnit } from 'src/utils/file-storage';
import { UpdateUploadDto } from './dto';
import { FileStorage } from 'src/utils/file-storage';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadsRepo: Repository<Upload>,
  ) {}

  async findAll() {
    const uploads = await this.uploadsRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return uploads;
  }

  async findOne(id: string) {
    const file = await this.uploadsRepo.findOne({
      where: {
        id,
      },
    });

    if (!file) {
      throw new NotFoundException(ErrorMessages.FILE_NOT_FOUND);
    }

    return file;
  }

  async create(file: Express.Multer.File, createUploadDto: CreateUploadDto) {
    const image = this.uploadsRepo.create({
      imageName: file.filename,
      alt: createUploadDto.alt,
      location: StorageUnit.PRODUCT_IMAGE,
    });

    return await this.uploadsRepo.save(image);
  }

  async update(id: string, updateUploadDto: UpdateUploadDto) {
    const file = await this.findOne(id);

    file.alt = updateUploadDto.alt;

    return await this.uploadsRepo.save(file);
  }

  async remove(id: string) {
    const image = await this.findOne(id);
    await FileStorage.remove(StorageUnit.PRODUCT_IMAGE, image.imageName);
    await this.uploadsRepo.remove(image);
  }
}
