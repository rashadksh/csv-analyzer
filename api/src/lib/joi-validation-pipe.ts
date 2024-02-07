import { Schema, ValidationError } from 'joi';
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Schema<any>) {}

  async transform(value: any, meta: ArgumentMetadata) {
    if (meta.type !== 'body') {
      return value;
    }

    try {
      await this.schema.validateAsync(value, {
        abortEarly: false,
      });
      return value;
    } catch (error) {
      const formattedError = this.formatJoiError(error);
      throw new BadRequestException(formattedError);
    }
  }

  formatJoiError(error: ValidationError) {
    return error.details.map((detail) => ({
      [detail.path[0]]: detail.message,
    }));
  }
}
