import { BadRequestException } from '@nestjs/common';
import {
  ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
  CPF_AND_CNPJ_ERROR,
} from '../../../shared';

type CpfAndCnpj = {
  cpf: string;
  cnpj: string;
};

export const shouldNotExistsCpfAndCnpj = ({ cnpj, cpf }: CpfAndCnpj) => {
  if (cpf && cnpj) {
    throw new BadRequestException(CPF_AND_CNPJ_ERROR);
  }
};

type ValidateTotalFarmArea = {
  total_farm_area: number;
  vegetation_farm_area: number;
  arable_farm_area: number;
};

export const validateTotalFarmArea = ({
  arable_farm_area,
  total_farm_area,
  vegetation_farm_area,
}: ValidateTotalFarmArea) => {
  if (arable_farm_area + vegetation_farm_area > total_farm_area) {
    throw new BadRequestException(
      ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
    );
  }
};
