import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { createCustomDecorator } from '../utils';
import { CPF as cpfUtils } from 'dochelper';

@ValidatorConstraint({ name: 'custom-cpf', async: true })
@Injectable()
export class CustomCPFValidation implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    return cpfUtils.validate(value);
  }

  defaultMessage(): string {
    return `Invalid CPF!`;
  }
}

export const IsCustomCPF = (validationOptions?: ValidationOptions) =>
  createCustomDecorator({
    name: 'Custom CPF Validation',
    validator: CustomCPFValidation,
    validationOptions,
  });
