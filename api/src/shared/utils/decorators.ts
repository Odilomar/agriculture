import { registerDecorator, ValidationOptions } from 'class-validator';

type CustomDecorator = {
  name: string;
  validator: any;
  validationOptions?: ValidationOptions;
};

export const createCustomDecorator = ({
  name,
  validator,
  validationOptions,
}: CustomDecorator) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator,
    });
  };
};
