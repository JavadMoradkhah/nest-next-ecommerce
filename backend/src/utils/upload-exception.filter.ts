import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FileValidationException } from './file-validation-exception';
import * as fs from 'fs/promises';
import { Request, Response } from 'express';

@Catch(FileValidationException)
export class UploadExceptionFilter implements ExceptionFilter {
  catch(exception: FileValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const uploadedFile = request?.file as Express.Multer.File;

    if (request.file) {
      fs.unlink(uploadedFile.path);
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: 'Unprocessable Entity',
    });
  }
}
