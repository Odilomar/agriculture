import { TransformFnParams } from 'class-transformer';

export const transformToArray = ({ value }: TransformFnParams) => {
  if (!value) return null;

  const listValues = typeof value === 'string' && value.split(',');
  if (listValues.length > 0) {
    value = listValues.map((i: string) => i.trim());
  }

  if (!Array.isArray(value)) return [value];

  return value;
};
