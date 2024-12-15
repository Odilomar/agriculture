import { TransformFnParams } from 'class-transformer';
import { transformToArray } from './toArray';

export const transformToNumberArray = (input: TransformFnParams) => {
  const stringArray = transformToArray(input);

  return stringArray?.length
    ? stringArray.map((value) => Number(value))
    : stringArray;
};
