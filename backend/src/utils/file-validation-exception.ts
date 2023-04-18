import { HttpException, HttpStatus } from '@nestjs/common';

export class FileValidationException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
