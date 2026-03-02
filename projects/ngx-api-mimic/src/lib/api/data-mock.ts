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
  | 'enum';

export interface NgxApiMimicMockDataValOptions {
  type: NgxApiMimicMockDataType;
  min?: number;
  max?: number;
  round?: boolean;
  precision?: number;
  minLength?: number;
  maxLength?: number;
  dateStart?: Date;
  dateEnd?: Date;
  enum?: any[];
}

export interface NgxApiMimicSchemaDefinition extends NgxApiMimicMockDataValOptions {
  type: NgxApiMimicMockDataType;
  staticValue?: any;
  items?: {
    [key: string]: NgxApiMimicSchemaDefinition;
  };
  item?: NgxApiMimicSchemaDefinition;
  itemCount?: number;
}

