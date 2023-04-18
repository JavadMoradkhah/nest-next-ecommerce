import * as path from 'path';
import * as fs from 'fs/promises';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { FileValidationException } from './file-validation-exception';

export const enum StorageUnit {
  IMAGE = '/uploads/images/',
}

export const enum FileType {
  IMAGE_JPEG = 'image/jpeg',
}

export const getUploadOptions = (storageUnit: StorageUnit): MulterOptions => {
  const uploadPath = path.join(process.cwd(), 'public', storageUnit);

  return {
    storage: diskStorage({
      async destination(req, file, cb) {
        await fs.mkdir(uploadPath, { recursive: true });
        cb(null, uploadPath);
      },
      filename(req: Express.Request, file: Express.Multer.File, cb) {
        const fileExt = file.mimetype.split('/')[1];
        const fileName = `${Date.now()}-${Math.round(
          Math.random() * 1e9,
        )}.${fileExt}`;

        cb(null, fileName);
      },
    }),
  };
};

export const validateFilePipe = (maxSize: number, fileType: FileType) => {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize }),
      new FileTypeValidator({ fileType }),
    ],
    fileIsRequired: true,
    exceptionFactory(error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(error);
      }
      throw new FileValidationException(error);
    },
  });
};

export class FileStorage {
  static async remove(storageUnit: StorageUnit, fileName: string) {
    const filePath = path.join(process.cwd(), 'public', storageUnit, fileName);
    // try {
    await fs.unlink(filePath);
    // } catch (error) {
    //   if (error?.code !== 'ENOENT') {
    //     throw error;
    //   }
    // }
  }
}
