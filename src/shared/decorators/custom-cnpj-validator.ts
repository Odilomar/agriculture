import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { createCustomDecorator } from '../utils';
import { CNPJ as cnpjUtils } from 'dochelper';

@ValidatorConstraint({ name: 'custom-cnpj', async: true })
@Injectable()
export class CustomCNPJValidation implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    return cnpjUtils.validate(value);
  }

  defaultMessage(): string {
    return `Invalid CNPJ!`;
  }
}

export const IsCustomCNPJ = (validationOptions?: ValidationOptions) =>
  createCustomDecorator({
    name: 'Custom CNPJ Validation',
    validator: CustomCNPJValidation,
    validationOptions,
  });
