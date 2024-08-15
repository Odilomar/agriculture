import { TransformFnParams } from 'class-transformer';
import { CNPJ as cnpjUtils } from 'dochelper';

export const transformToStringCnpj = ({ value }: TransformFnParams) => {
  if (!value) return null;

  return cnpjUtils.unformat(value);
};
