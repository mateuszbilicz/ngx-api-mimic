export type NgxApiMimicMockDataType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'date'
  | 'firstName'
  | 'lastName'
  | 'fullName'
  | 'email'
  | 'nameEmail'
  | 'password'
  | 'object'
  | 'array'
  | 'enum'
  | 'custom'
  | 'static';

interface NgxApiMimicMockDataValOptionsBase {
  type: NgxApiMimicMockDataType;
}

export interface NgxApiMimicMockDataNumberValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'number';
  min?: number;
  max?: number;
  round?: boolean;
  precision?: number;
}

export interface NgxApiMimicMockDataStringValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  customCharset?: string;
}

export interface NgxApiMimicMockDataBooleanValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'boolean';
}

export interface NgxApiMimicMockDataDateValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'date';
  dateStart?: Date;
  dateEnd?: Date;
}

export interface NgxApiMimicMockDataEnumValOptions<T = any> extends NgxApiMimicMockDataValOptionsBase {
  type: 'enum';
  enum: T[];
}
export interface NgxApiMimicMockDataFirstNameValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'firstName';
}

export interface NgxApiMimicMockDataLastNameValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'lastName';
}

export interface NgxApiMimicMockDataFullNameValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'fullName';
}

export interface NgxApiMimicMockDataEmailValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'email';
}

export interface NgxApiMimicMockDataNameEmailValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'nameEmail';
  firstName?: string;
  lastName?: string;
}

export interface NgxApiMimicMockDataPasswordValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'password';
  minLength?: number;
  maxLength?: number;
  customUpperCharset?: string;
  customLowerCharset?: string;
  customNumberCharset?: string;
  customSpecialCharset?: string;
}

export interface NgxApiMimicMockDataObjectValOptions<
  T = any,
> extends NgxApiMimicMockDataValOptionsBase {
  type: 'object';
  staticValue?: T;
  items: { [K in keyof T]: MockSchemaOf<T[K]> };
}

export interface NgxApiMimicMockDataArrayValOptions<
  T = any,
> extends NgxApiMimicMockDataValOptionsBase {
  type: 'array';
  staticValue?: T[];
  item: MockSchemaOf<T>;
  itemCount: number;
}

export interface NgxApiMimicMockDataCustomValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'custom';
  customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any;
}

export interface NgxApiMimicMockDataStaticValOptions<
  T = any,
> extends NgxApiMimicMockDataValOptionsBase {
  type: 'static';
  value: T;
}

export type NgxApiMimicMockDataSchematic =
  | NgxApiMimicMockDataNumberValOptions
  | NgxApiMimicMockDataStringValOptions
  | NgxApiMimicMockDataBooleanValOptions
  | NgxApiMimicMockDataDateValOptions
  | NgxApiMimicMockDataEnumValOptions
  | NgxApiMimicMockDataFirstNameValOptions
  | NgxApiMimicMockDataLastNameValOptions
  | NgxApiMimicMockDataFullNameValOptions
  | NgxApiMimicMockDataEmailValOptions
  | NgxApiMimicMockDataNameEmailValOptions
  | NgxApiMimicMockDataPasswordValOptions
  | NgxApiMimicMockDataObjectValOptions
  | NgxApiMimicMockDataArrayValOptions
  | NgxApiMimicMockDataCustomValOptions
  | NgxApiMimicMockDataStaticValOptions;

export interface NgxApiMimicMockCustomFunctionInstructions {
  randomNumber: (min: number, max: number, round: boolean, precision: number) => number;
  randomString: (minLength: number, maxLength: number, customCharset?: string) => string;
  randomBool: () => boolean;
  randomDate: (dateStart: Date, dateEnd: Date) => Date;
  firstName: () => string;
  lastName: () => string;
  randomFullName: () => string;
  randomEmail: () => string;
  emailBasedOnName: (firstName: string, lastName: string) => string;
  randomEnum: (enumArray: any[]) => any;
  password: (minLength: number, maxLength: number) => string;
  custom: (customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any) => any;
}

type SchematicProducingString =
  | NgxApiMimicMockDataStringValOptions
  | NgxApiMimicMockDataFirstNameValOptions
  | NgxApiMimicMockDataLastNameValOptions
  | NgxApiMimicMockDataFullNameValOptions
  | NgxApiMimicMockDataEmailValOptions
  | NgxApiMimicMockDataNameEmailValOptions
  | NgxApiMimicMockDataPasswordValOptions;

type SchematicProducingNumber = NgxApiMimicMockDataNumberValOptions;

type SchematicProducingDate = NgxApiMimicMockDataDateValOptions;

type UniversalSchematics<T> =
  | NgxApiMimicMockDataEnumValOptions<T>
  | NgxApiMimicMockDataCustomValOptions
  | NgxApiMimicMockDataStaticValOptions<T>;

export type MockSchemaOf<T> =
  | (T extends Array<infer U>
      ? NgxApiMimicMockDataArrayValOptions<U>
      : T extends Date
        ? SchematicProducingDate
        : T extends number
          ? SchematicProducingNumber
          : T extends string
            ? SchematicProducingString
            : T extends boolean
              ? NgxApiMimicMockDataBooleanValOptions
              : T extends object
                ? NgxApiMimicMockDataObjectValOptions<T>
                : NgxApiMimicMockDataSchematic)
  | UniversalSchematics<T>;
