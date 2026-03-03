import {
  NgxApiMimicMockCustomFunctionInstructions,
  NgxApiMimicMockDataArrayValOptions,
  NgxApiMimicMockDataObjectValOptions,
  NgxApiMimicMockDataSchematic,
} from '../api/data-mock';
import { firstNames, generateEmail, lastNames } from './predefined-values';

/** Mocking schematic base functions - use NgxApiMimicMockData class for your data classes */
export class NgxApiMimicMockSchema<T> {
  private readonly customFnInstructions: NgxApiMimicMockCustomFunctionInstructions = {
    randomNumber: this._$generateRandomNumber,
    randomString: this._$generateRandomString,
    randomBool: this._$generateRandomBool,
    randomDate: this._$generateRandomDate,
    firstName: this._$generateFirstName,
    lastName: this._$generateLastName,
    randomFullName: this._$generateRandomFullName,
    randomEmail: this._$generateRandomEmail,
    emailBasedOnName: this._$generateEmailBasedOnName,
    randomEnum: this._$generateRandomEnum,
    password: this._$generatePassword,
    custom: this._$generateCustom,
  };

  /** Generates random number based on given parameters */
  _$generateRandomNumber(min: number, max: number, round: boolean, precision: number): number {
    let rand = Math.random() * (max - min) + min;
    if (round) rand = Math.round(rand);
    if (precision) rand = Math.round(rand * precision) / precision;
    return rand;
  }

  /** Generates random string based on given parameters */
  _$generateRandomString(minLength: number, maxLength: number, customCharset?: string): string {
    let characters =
        customCharset ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      length = Math.round(Math.random() * (maxLength - minLength)) + minLength,
      result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.round(Math.random() * (characters.length - 1)));
    }
    return result;
  }

  /** Generates random boolean */
  _$generateRandomBool(): boolean {
    return Math.random() > 0.5;
  }

  /** Generates random date based on given parameters */
  _$generateRandomDate(dateStart: Date, dateEnd: Date): Date {
    return new Date(
      dateStart.getTime() + Math.random() * (dateEnd.getTime() - dateStart.getTime()),
    );
  }

  /** Generates random first name */
  _$generateFirstName(): string {
    return firstNames[Math.round(Math.random() * (firstNames.length - 1))];
  }

  /** Generates random last name */
  _$generateLastName(): string {
    return lastNames[Math.round(Math.random() * (lastNames.length - 1))];
  }

  /** Generates random email */
  _$generateRandomEmail(): string {
    return generateEmail();
  }

  /** Generates random email based on first name and last name */
  _$generateEmailBasedOnName(firstName: string, lastName: string): string {
    return `${firstName}${Math.random() > 0.5 ? '.' : ''}${lastName}@test.com`.toLowerCase();
  }

  /** Generates random full name */
  _$generateRandomFullName(): string {
    return `${this._$generateFirstName()} ${this._$generateLastName()}`;
  }

  /** Generates random enum value based on given parameters */
  _$generateRandomEnum(enumArray: any[]): any {
    return enumArray[Math.round(Math.random() * (enumArray.length - 1))];
  }

  /** Generates random password based on given parameters */
  _$generatePassword(
    minLength: number,
    maxLength: number,
    customUpperCharset?: string,
    customLowerCharset?: string,
    customNumberCharset?: string,
    customSpecialCharset?: string,
  ): string {
    let upperCharacters = customUpperCharset ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowerCharacters = customLowerCharset ?? 'abcdefghijklmnopqrstuvwxyz',
      numberCharacters = customNumberCharset ?? '0123456789',
      specialCharacters = customSpecialCharset ?? '@$!%*#?&',
      length = Math.round(Math.random() * (maxLength - minLength)) + minLength,
      result = `${upperCharacters.charAt(
        Math.round(Math.random() * (upperCharacters.length - 1)),
      )}`;
    if (minLength < 4) throw new Error('Effective password must have at least 4 characters');
    for (let i = 0; i < length - 3; i++) {
      result += lowerCharacters.charAt(Math.round(Math.random() * (lowerCharacters.length - 1)));
    }
    result += `${numberCharacters.charAt(
      Math.round(Math.random() * (numberCharacters.length - 1)),
    )}`;
    result += `${specialCharacters.charAt(
      Math.round(Math.random() * (specialCharacters.length - 1)),
    )}`;
    return result;
  }

  /** Runs custom value generator functions, can be used for different objects that depends on specific value / enum */
  _$generateCustom(customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any): any {
    return customFn(this.customFnInstructions);
  }

  /** Function that generates array of random data based on schema */
  _$generateArrayFromSchema(e: NgxApiMimicMockDataArrayValOptions): any[] {
    let result: any[] = [];
    if (e.staticValue) {
      return e.staticValue;
    }
    for (let i = 0; i < (e.itemCount ?? 0); i++) {
      if (!e.item) throw new Error('No item schema defined for array');
      result.push(this._$generateVal(e.item!));
    }
    return result;
  }

  /** Function that generates object of random data based on schema */
  _$generateObjectFromSchema(obj: NgxApiMimicMockDataObjectValOptions): any {
    let result: any = {};
    if (obj.staticValue) {
      return obj.staticValue;
    }
    if (!obj.items) throw new Error('Items schema not defined in object');
    Object.keys(obj.items!).forEach((key) => {
      const curr = obj.items![key];
      result[key] = this._$generateVal(curr);
    });
    return result;
  }

  /** Generates random value based on given options object */
  _$generateVal(options: NgxApiMimicMockDataSchematic): number | string | boolean | Date | null | any {
    switch (options.type) {
      case 'number':
        return this._$generateRandomNumber(
          options.min ?? 0,
          options.max ?? 100,
          options.round ?? false,
          options.precision ?? 1,
        );
      case 'string':
        return this._$generateRandomString(
          options.minLength ?? 8,
          options.maxLength ?? 32,
          options.customCharset,
        );
      case 'boolean':
        return this._$generateRandomBool();
      case 'date':
        const now = new Date();
        return this._$generateRandomDate(
          options.dateStart ?? new Date(now.getFullYear() - 50, 0, 0, 0, 0, 0, 0),
          options.dateEnd ?? now,
        );
      case 'firstName':
        return this._$generateFirstName();
      case 'lastName':
        return this._$generateLastName();
      case 'fullName':
        return this._$generateRandomFullName();
      case 'email':
        return this._$generateRandomEmail();
      case 'nameEmail':
        return this._$generateEmailBasedOnName(
          options?.firstName ?? this._$generateFirstName(),
          options?.lastName ?? this._$generateLastName(),
        );
      case 'password':
        return this._$generatePassword(
          options.minLength ?? 8,
          options.maxLength ?? 32,
          options.customUpperCharset,
          options.customLowerCharset,
          options.customNumberCharset,
          options.customSpecialCharset,
        );
      case 'enum':
        return this._$generateRandomEnum(options.enum ?? []);
      case 'custom':
        return this._$generateCustom(options.customFn);
      case 'static':
        return options.value;
      case 'array':
        return this._$generateArrayFromSchema(options);
      case 'object':
        return this._$generateObjectFromSchema(options);
      default:
        const _exhaustive: never = options;
        return null;
    }
  }
}
