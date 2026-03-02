import {firstNames, generateEmail, lastNames} from "./predefined-values";

export type NgxApiMimicMockDataType = 'number'
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

export class MockBase {

  generateRandomNumber(
    min: number,
    max: number,
    round: boolean,
    precision: number
  ): number {
    let rand = Math.random() * (max - min) + min;
    if (round)
      rand = Math.round(rand);
    if (precision)
      rand = Math.round(rand * precision) / precision;
    return rand;
  }

  generateRandomString(minLength: number, maxLength: number): string {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      length = Math.round(
        Math.random() * (maxLength - minLength)
      ) + minLength,
      result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.round(Math.random() * (characters.length - 1))
      );
    }
    return result;
  }

  generateRandomBool(): boolean {
    return Math.random() > .5;
  }

  generateRandomDate(dateStart: Date, dateEnd: Date): Date {
    return new Date(
      dateStart.getTime() + Math.random() * (dateEnd.getTime() - dateStart.getTime())
    );
  }

  generateFirstName(): string {
    return firstNames[
      Math.round(Math.random() * (firstNames.length - 1))
      ];
  }

  generateLastName(): string {
    return lastNames[
      Math.round(Math.random() * (lastNames.length - 1))
      ];
  }

  generateRandomEmail(): string {
    return generateEmail();
  }

  generateEmailBasedOnName(
    firstName: string,
    lastName: string
  ): string {
    return `${firstName}${Math.random() > .5 ? '.' : ''}${lastName}@test.com`.toLowerCase();
  }

  generateRandomFullName(): string {
    return `${this.generateFirstName()} ${this.generateLastName()}`
  }

  generateRandomEnum(enumArray: any[]): any {
    return enumArray[Math.round(Math.random() * (enumArray.length - 1))];
  }

  generatePassword(minLength: number, maxLength: number): string {
    let upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowerCharacters = 'abcdefghijklmnopqrstuvwxyz',
      numberCharacters = '0123456789',
      specialCharacters = '@$!%*#?&',
      length = Math.round(
        Math.random() * (maxLength - minLength)
      ) + minLength,
      result = `${
        upperCharacters.charAt(
          Math.round(
            Math.random() * (upperCharacters.length - 1)
          )
        )
      }`;
    if (minLength < 4) throw new Error('Effective password must have at least 4 characters');
    for (let i = 0; i < length - 3; i++) {
      result += lowerCharacters.charAt(
        Math.round(
          Math.random() * (lowerCharacters.length - 1)
        )
      );
    }
    result += `${
      numberCharacters.charAt(
        Math.round(
          Math.random() * (numberCharacters.length - 1)
        )
      )
    }`;
    result += `${specialCharacters.charAt(
      Math.round(Math.random() * (specialCharacters.length - 1)),
    )}`;
    return result;
  }

  generateVal(
    options: NgxApiMimicMockDataValOptions
  ): number | string | boolean | Date | null {
    switch (options.type) {
      case 'number':
        return this.generateRandomNumber(
          options.min ?? 0,
          options.max ?? 100,
          options.round ?? false,
          options.precision ?? 1
        );
      case 'string':
        return this.generateRandomString(
          options.minLength ?? 8,
          options.maxLength ?? 32
        );
      case 'boolean':
        return this.generateRandomBool();
      case 'date':
        const now = new Date();
        return this.generateRandomDate(
          options.dateStart ?? new Date(now.getFullYear() - 50, 0, 0, 0, 0, 0, 0),
          options.dateEnd ?? now
        );
      case 'firstName':
        return this.generateFirstName();
      case 'lastName':
        return this.generateLastName();
      case 'fullName':
        return this.generateRandomFullName();
      case 'email':
        return this.generateRandomEmail();
      case 'nameEmail':
        return this.generateEmailBasedOnName(
          this.generateFirstName(),
          this.generateLastName()
        );
      case 'password':
        return this.generatePassword(
          options.minLength ?? 8,
          options.maxLength ?? 32
        );
      case 'enum':
        return this.generateRandomEnum(
          options.enum ?? []
        );
      default:
        return null;
    }
  }

  setStore(name: string, value: any) {
    const storeFullName = 'mock-' + name;
    localStorage.setItem(
      storeFullName,
      JSON.stringify({
        name: name,
        savedAt: new Date(),
        value: value
      })
    );
  }

  deleteStore(name: string) {
    localStorage.removeItem('mock-' + name);
  }

  getStore<T>(name: string, defaultValue?: any): T {
    const storeFullName = 'mock-' + name,
      stored = localStorage.getItem(storeFullName);
    if (!stored) return defaultValue ?? null;
    return JSON.parse(stored).value as T;
  }
}
