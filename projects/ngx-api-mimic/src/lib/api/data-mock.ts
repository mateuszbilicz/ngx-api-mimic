/** Mock schematic data type */
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

/** Base mock data value options interface */
interface NgxApiMimicMockDataValOptionsBase {
  type: NgxApiMimicMockDataType;
}

/** Number mock data value options interface */
export interface NgxApiMimicMockDataNumberValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'number';
  min?: number;
  max?: number;
  round?: boolean;
  precision?: number;
}

/** String mock data value options interface */
export interface NgxApiMimicMockDataStringValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  customCharset?: string;
}

/** Boolean mock data value options interface */
export interface NgxApiMimicMockDataBooleanValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'boolean';
}

/** Date mock data value options interface */
export interface NgxApiMimicMockDataDateValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'date';
  dateStart?: Date;
  dateEnd?: Date;
}

/** Enum mock data value options interface */
export interface NgxApiMimicMockDataEnumValOptions<T = any> extends NgxApiMimicMockDataValOptionsBase {
  type: 'enum';
  enum: T[];
}

/** FirstName mock data value options interface */
export interface NgxApiMimicMockDataFirstNameValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'firstName';
}

/** LastName mock data value options interface */
export interface NgxApiMimicMockDataLastNameValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'lastName';
}

/** FullName mock data value options interface */
export interface NgxApiMimicMockDataFullNameValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'fullName';
}

/** Email mock data value options interface */
export interface NgxApiMimicMockDataEmailValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'email';
}

/** NameEmail mock data value options interface */
export interface NgxApiMimicMockDataNameEmailValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'nameEmail';
  firstName?: string;
  lastName?: string;
}

/** Password mock data value options interface */
export interface NgxApiMimicMockDataPasswordValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'password';
  minLength?: number;
  maxLength?: number;
  customUpperCharset?: string;
  customLowerCharset?: string;
  customNumberCharset?: string;
  customSpecialCharset?: string;
}

/** Schematic object mock value options interface */
export interface NgxApiMimicMockDataObjectValOptions<
  T = any,
> extends NgxApiMimicMockDataValOptionsBase {
  type: 'object';
  staticValue?: T;
  items: { [K in keyof T]: MockSchemaOf<T[K]> };
}

/** Schematic array mock value options interface */
export interface NgxApiMimicMockDataArrayValOptions<
  T = any,
> extends NgxApiMimicMockDataValOptionsBase {
  type: 'array';
  staticValue?: T[];
  item: MockSchemaOf<T>;
  itemCount: number;
}

/** Custom mock data value options interface */
export interface NgxApiMimicMockDataCustomValOptions extends NgxApiMimicMockDataValOptionsBase {
  type: 'custom';
  customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any;
}

/** Static mock data value options interface */
export interface NgxApiMimicMockDataStaticValOptions<
  T = any,
> extends NgxApiMimicMockDataValOptionsBase {
  type: 'static';
  value: T;
}

/** Mock data value options type */
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

/** Custom mock data type function parameters */
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
  password: (
    minLength: number,
    maxLength: number,
    customUpperCharset?: string,
    customLowerCharset?: string,
    customNumberCharset?: string,
    customSpecialCharset?: string,
  ) => string;
  custom: (customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any) => any;
}

/** Schematics that produce string type value */
type SchematicProducingString =
  | NgxApiMimicMockDataStringValOptions
  | NgxApiMimicMockDataFirstNameValOptions
  | NgxApiMimicMockDataLastNameValOptions
  | NgxApiMimicMockDataFullNameValOptions
  | NgxApiMimicMockDataEmailValOptions
  | NgxApiMimicMockDataNameEmailValOptions
  | NgxApiMimicMockDataPasswordValOptions;

/** Schematics that produce number type value */
type SchematicProducingNumber = NgxApiMimicMockDataNumberValOptions;

/** Schematics that produce date type value */
type SchematicProducingDate = NgxApiMimicMockDataDateValOptions;

/** Schematics that produce other types of value */
type UniversalSchematics<T> =
  | NgxApiMimicMockDataEnumValOptions<T>
  | NgxApiMimicMockDataCustomValOptions
  | NgxApiMimicMockDataStaticValOptions<T>;

/** Type that converts interfaces and types into value schematics hints to help devs write schematics */
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
