import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
  createCustomDecorator,
} from '../utils';

@ValidatorConstraint({ name: 'custom-total-farm-area', async: true })
@Injectable()
export class CustomTotalFarmAreaValidation
  implements ValidatorConstraintInterface
{
  async validate(
    totalFarmArea: number,
    args: ValidationArguments,
  ): Promise<boolean> {
    const object = args.object as any;

    const arableFarmArea = Number(object['arable_farm_area']);
    const vegetationFarmArea = Number(object['vegetation_farm_area']);

    return arableFarmArea + vegetationFarmArea <= Number(totalFarmArea);
  }

  defaultMessage(): string {
    return ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA;
  }
}

export const IsCustomTotalFarmArea = (validationOptions?: ValidationOptions) =>
  createCustomDecorator({
    name: 'Custom Total Farm Area Validation',
    validator: CustomTotalFarmAreaValidation,
    validationOptions,
  });
