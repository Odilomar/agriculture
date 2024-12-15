import { TransformFnParams } from 'class-transformer';

export const transformToDoubleNumber = ({ value }: TransformFnParams) => {
  if (!value) return null;

  return Number(value).toFixed(2);
};
