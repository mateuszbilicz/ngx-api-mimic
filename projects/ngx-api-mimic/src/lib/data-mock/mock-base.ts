import {firstNames, generateEmail, lastNames} from "./predefined-values";
import { NgxApiMimicMockDataValOptions } from '../api/data-mock';

/** Mocking base functions - use MockSchema class for your data classes */
export class MockBase {
  /** Generates random number based on given parameters */
  _$generateRandomNumber(min: number, max: number, round: boolean, precision: number): number {
    let rand = Math.random() * (max - min) + min;
    if (round) rand = Math.round(rand);
    if (precision) rand = Math.round(rand * precision) / precision;
    return rand;
  }

  /** Generates random string based on given parameters */
  _$generateRandomString(minLength: number, maxLength: number): string {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
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
  _$generatePassword(minLength: number, maxLength: number): string {
    let upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowerCharacters = 'abcdefghijklmnopqrstuvwxyz',
      numberCharacters = '0123456789',
      specialCharacters = '@$!%*#?&',
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

  /** Generates random value based on given options object */
  _$generateVal(options: NgxApiMimicMockDataValOptions): number | string | boolean | Date | null {
    switch (options.type) {
      case 'number':
        return this._$generateRandomNumber(
          options.min ?? 0,
          options.max ?? 100,
          options.round ?? false,
          options.precision ?? 1,
        );
      case 'string':
        return this._$generateRandomString(options.minLength ?? 8, options.maxLength ?? 32);
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
          this._$generateFirstName(),
          this._$generateLastName(),
        );
      case 'password':
        return this._$generatePassword(options.minLength ?? 8, options.maxLength ?? 32);
      case 'enum':
        return this._$generateRandomEnum(options.enum ?? []);
      default:
        return null;
    }
  }

  /** Updates localStorage store value */
  _$setStore(name: string, value: any) {
    const storeFullName = 'mock-' + name;
    localStorage.setItem(
      storeFullName,
      JSON.stringify({
        name: name,
        savedAt: new Date(),
        value: value,
      }),
    );
  }

  /** Completely removes stored mocked data from localStorage */
  _$deleteStore(name: string) {
    localStorage.removeItem('mock-' + name);
  }

  /** Returns current localStorage store value */
  _$getStore<T>(name: string, defaultValue?: any): T {
    const storeFullName = 'mock-' + name,
      stored = localStorage.getItem(storeFullName);
    if (!stored) return defaultValue ?? null;
    return JSON.parse(stored).value as T;
  }
}
