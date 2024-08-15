import { TransformFnParams } from 'class-transformer';
import { CPF as cpfUtils } from 'dochelper';

export const transformToStringCpf = ({ value }: TransformFnParams) => {
  if (!value) return null;

  return cpfUtils.unformat(value);
};
