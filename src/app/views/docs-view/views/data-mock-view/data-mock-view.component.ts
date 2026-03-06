import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPageComponent } from '../../../../core/elements/doc-page/doc-page.component';
import { DescriptionTreeBranch } from '../../../../core/api/description-tree';
import { DescriptionTreeComponent } from '../../../../core/elements/description-tree/description-tree.component';

@Component({
  selector: 'app-data-mock-view',
  imports: [DocPageComponent, DescriptionTreeComponent],
  templateUrl: './data-mock-view.component.html',
  styleUrl: './data-mock-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMockViewComponent {
  classTree: DescriptionTreeBranch = {
    title: 'Classes',
    description: `Classes available in Data Mock.`,
    items: [
      {
        title: 'NgxApiMimicMockData<T>',
        description: `Extends NgxApiMimicMockSchema<T>. Base for your data services. Use YourClass extends NgxApiMimicMockData<YourInterface>.`,
        items: [
          {
            title: 'super(storeName: string, schema: MockSchemaOf, noStore?: boolean)',
            description:
              "In constructor of your class that extends this one, you'll need to add super(storeName: string, schema: MockSchemaOf, noStore?: boolean).",
            items: [
              {
                title: 'storeName: string',
                description: 'LocalStorage name of this mocked data.',
              },
              {
                title: 'schema: MockSchemaOf',
                description: `Data schematic object. Your IDE will give you hints on which value you can use in specific object - it's based on T type you've provided to NgxApiMimicMockData`,
              },
              {
                title: 'noStore?: boolean',
                description: `Disable LocalStorage store. Use it when you're writing schema to prevent saving and loading it from local storage.`,
              },
            ],
          },
          {
            title: 'data: T',
            description: `Data getter and setter, DO NOT USE data.push and other methods like that. To update data you'll need to do data = [...data, {}].`,
          },
          {
            title: `name: string = 'blank'`,
            description: 'Internal variable, LocalStorage store name.',
          },
          {
            title: `preventStore: boolean = true`,
            description: 'Internal variable, disable use of LocalStorage store.',
          },
          {
            title: '_$setStore(name: string, value: T)',
            description: 'Internal method, set store value (automatic, use data setter).',
          },
          {
            title: '_$getStore(name: string, defaultValue?: any)',
            description:
              'Internal method, get store value from LocalStorage (automatic, use data getter).',
          },
          {
            title: '_$deleteStore(name: string)',
            description:
              'Internal method, delete LocalStorage store - use it when you want to automatically delete LocalStorage store to force generating items after service constructor run next time.',
          },
        ],
      },
      {
        title: 'NgxApiMimicMockSchema<T>',
        description: `Base class for generating schematics. Contains set of internal functions and variables to generate data and let you use these methods inside your top-level class methods.`,
        items: [
          {
            title:
              '_$generateVal(options: NgxApiMimicMockDataSchematic): number | string | boolean | Date | null | any',
            description: `Internal method, generates value from schematic object (recurrent).`,
          },
          {
            title: '_$generateObjectFromSchema(obj: NgxApiMimicMockDataObjectValOptions): any',
            description: `Internal method, generates object of random data based on schema.`,
          },
          {
            title: '_$generateArrayFromSchema(e: NgxApiMimicMockDataArrayValOptions): any[]',
            description: `Internal method, generates array of random data based on schema.`,
          },
          {
            title:
              '_$generateCustom(customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any): any',
            description: `Internal method, runs custom value generator functions, can be used for different objects that depends on specific value / enum.`,
          },
          {
            title: `_$generatePassword(
  minLength: number,
  maxLength: number,
  customUpperCharset?: string,
  customLowerCharset?: string,
  customNumberCharset?: string,
  customSpecialCharset?: string,
): string`,
            description: `Internal method, generates random password based on given parameters.`,
          },
          {
            title: '_$generateRandomEnum(enumArray: any[]): any',
            description: `Internal method, generates random enum value based on given parameters.`,
          },
          {
            title: '_$generateRandomFullName(): string',
            description: `Internal method, generates random full name.`,
          },
          {
            title: '_$generateEmailBasedOnName(firstName: string, lastName: string): string',
            description: `Internal method, generates random email based on first name and last name.`,
          },
          {
            title: '_$generateRandomEmail(): string',
            description: `Internal method, generates random email.`,
          },
          {
            title: '_$generateLastName(): string',
            description: `Internal method, generates random last name.`,
          },
          {
            title: '_$generateFirstName(): string',
            description: `Internal method, generates random first name.`,
          },
          {
            title: '_$generateRandomDate(dateStart: Date, dateEnd: Date): Date',
            description: `Internal method, generates random date based on given parameters.`,
          },
          {
            title: '_$generateRandomBool(): boolean',
            description: `Internal method, generates random boolean.`,
          },
          {
            title:
              '_$generateRandomString(minLength: number, maxLength: number, customCharset?: string): string',
            description: `Internal method, generates random string based on given parameters.`,
          },
          {
            title:
              '_$generateRandomNumber(min: number, max: number, round: boolean, precision: number): number',
            description: `Internal method, generates random number based on given parameters.`,
          },
          {
            title: 'customFnInstructions: NgxApiMimicMockCustomFunctionInstructions',
            description: `Internal variable, instruction set for customFn.`,
          },
        ],
      },
    ],
  };
  typesAndInterfacesTree: DescriptionTreeBranch = {
    title: 'Types and interfaces',
    description: `Types and interfaces exported by Data Mock.`,
    items: [
      {
        title: 'MockSchemaOf<T>',
        description: `Type that converts interfaces and types into value schematics hints to help devs write schematics.`,
      },
      {
        title: 'NgxApiMimicMockDataType',
        description: `Mock schematic data type.`,
      },
      {
        title: 'NgxApiMimicMockDataSchematic',
        description: `Mock data value options type.`,
        items: [
          {
            title: 'NgxApiMimicMockDataValOptionsBase',
            description: `Base mock data value options interface.`,
            items: [
              {
                title: 'type: NgxApiMimicMockDataType',
                description: `Type of mock schematic object.`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataNumberValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. Number mock data value options interface.`,
            items: [
              {
                title: 'min?: number',
                description: `Minimum number.`,
              },
              {
                title: 'max?: number',
                description: `Maximum number.`,
              },
              {
                title: 'round?: boolean',
                description: `Round number.`,
              },
              {
                title: 'precision?: number',
                description: `Number precision.`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataStringValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. String mock data value options interface.`,
            items: [
              {
                title: 'minLength?: number',
                description: `Minimum string length.`,
              },
              {
                title: 'maxLength?: number',
                description: `Maximum string length.`,
              },
              {
                title: 'customCharset?: string',
                description: `Custom charset to generate string from.`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataBooleanValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. Boolean mock data value options interface.`,
          },
          {
            title: 'NgxApiMimicMockDataDateValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. Date mock data value options interface.`,
            items: [
              {
                title: 'dateStart?: Date',
                description: `Minimum date.`,
              },
              {
                title: 'dateEnd?: Date',
                description: `Maximum date.`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataEnumValOptions<T = any>',
            description: `Extends NgxApiMimicMockDataValOptionsBase. Enum mock data value options interface.`,
            items: [
              {
                title: 'enum: T[]',
                description: `Enum (array of elements to select one from)`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataFirstNameValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. FirstName mock data value options interface.`,
          },
          {
            title: 'NgxApiMimicMockDataLastNameValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. LastName mock data value options interface.`,
          },
          {
            title: 'NgxApiMimicMockDataFullNameValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. FullName mock data value options interface.`,
          },
          {
            title: 'NgxApiMimicMockDataEmailValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. Email mock data value options interface.`,
          },
          {
            title: 'NgxApiMimicMockDataNameEmailValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. NameEmail mock data value options interface.`,
            items: [
              {
                title: 'firstName?: string',
                description: `First name.`,
              },
              {
                title: 'lastName?: string',
                description: `Last name.`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataPasswordValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. Password mock data value options interface.`,
            items: [
              {
                title: 'minLength?: number',
                description: `Minimum password length.`,
              },
              {
                title: 'maxLength?: number',
                description: `Maximum password length.`,
              },
              {
                title: 'customUpperCharset?: string',
                description: `Custom upper letters characters to generate password from.`,
              },
              {
                title: 'customLowerCharset?: string',
                description: `Custom lower letters characters to generate password from.`,
              },
              {
                title: 'customNumberCharset?: string',
                description: `Custom number characters to generate password from.`,
              },
              {
                title: 'customSpecialCharset?: string',
                description: `Custom special characters to generate password from.`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataObjectValOptions<T = any>',
            description: `Extends NgxApiMimicMockDataValOptionsBase. Schematic object mock value options interface.`,
            items: [
              {
                title: 'staticValue?: T',
                description: `Static object value.`,
              },
              {
                title: 'items: { [K in keyof T]: MockSchemaOf<T[K]> }',
                description: `Items of the object to generate by schematic.`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataArrayValOptions<T = any>',
            description: `Extends NgxApiMimicMockDataValOptionsBase. Schematic array mock value options interface.`,
            items: [
              {
                title: 'staticValue?: T[]',
                description: `Static array value.`,
              },
              {
                title: 'item: MockSchemaOf<T>',
                description: `Array item schema definition.`,
              },
              {
                title: 'itemCount: number',
                description: `Items count in the array.`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataCustomValOptions',
            description: `Extends NgxApiMimicMockDataValOptionsBase. Custom mock data value options interface.`,
            items: [
              {
                title: 'customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any',
                description: `Custom function to generate variable.`,
              },
            ],
          },
          {
            title: 'NgxApiMimicMockDataStaticValOptions<T = any>',
            description: `Extends NgxApiMimicMockDataValOptionsBase. .`,
            items: [
              {
                title: 'value: T',
                description: `Static value.`,
              },
            ],
          },
        ],
      },
      {
        title: 'NgxApiMimicMockCustomFunctionInstructions',
        description: `Custom mock data type function parameters.`,
        items: [
          {
            title:
              'randomNumber: (min: number, max: number, round: boolean, precision: number) => number',
            description: `Produces random number.`,
            items: [
              {
                title: 'min: number',
                description: `Minimum number.`,
              },
              {
                title: 'max: number',
                description: `Maximum number.`,
              },
              {
                title: 'round: boolean',
                description: `Round number.`,
              },
              {
                title: 'precision: number',
                description: `Number precision.`,
              },
            ],
          },
          {
            title:
              'randomString: (minLength: number, maxLength: number, customCharset?: string) => string',
            description: `Produces random string.`,
            items: [
              {
                title: 'minLength: number',
                description: `Minimum string length.`,
              },
              {
                title: 'maxLength: number',
                description: `Maximum string length.`,
              },
              {
                title: 'customCharset?: string',
                description: `Custom charset to generate string from.`,
              },
            ],
          },
          {
            title: 'randomBool: () => boolean',
            description: `Produces random boolean.`,
          },
          {
            title: 'randomDate: (dateStart: Date, dateEnd: Date) => Date',
            description: `Produces random date.`,
            items: [
              {
                title: 'dateStart: Date',
                description: `Minimum date.`,
              },
              {
                title: 'dateEnd: Date',
                description: `Maximum date.`,
              },
            ],
          },
          {
            title: 'firstName: () => string',
            description: `Produces random first name.`,
          },
          {
            title: 'lastName: () => string',
            description: `Produces random last name.`,
          },
          {
            title: 'randomFullName: () => string',
            description: `Produces random full name.`,
          },
          {
            title: 'randomEmail: () => string',
            description: `Produces random email.`,
          },
          {
            title: 'emailBasedOnName: (firstName: string, lastName: string) => string',
            description: `Produces random email based on first name and last name.`,
            items: [
              {
                title: 'firstName: string',
                description: `First name.`,
              },
              {
                title: 'lastName: string',
                description: `Last name.`,
              },
            ],
          },
          {
            title: 'randomEnum: (enumArray: any[]) => any',
            description: `Produces random enum.`,
            items: [
              {
                title: 'enumArray: T[]',
                description: `Enum (array of elements to select one from)`,
              },
            ],
          },
          {
            title: `password: (
    minLength: number,
    maxLength: number,
    customUpperCharset?: string,
    customLowerCharset?: string,
    customNumberCharset?: string,
    customSpecialCharset?: string,
  ) => string`,
            description: `Produces random password.`,
            items: [
              {
                title: 'minLength?: number',
                description: `Minimum password length.`,
              },
              {
                title: 'maxLength?: number',
                description: `Maximum password length.`,
              },
              {
                title: 'customUpperCharset?: string',
                description: `Custom upper letters characters to generate password from.`,
              },
              {
                title: 'customLowerCharset?: string',
                description: `Custom lower letters characters to generate password from.`,
              },
              {
                title: 'customNumberCharset?: string',
                description: `Custom number characters to generate password from.`,
              },
              {
                title: 'customSpecialCharset?: string',
                description: `Custom special characters to generate password from.`,
              },
            ],
          },
          {
            title:
              'custom: (customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any) => any',
            description: `Produces value generated by custom function.`,
            items: [
              {
                title: 'customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any',
                description: `Custom function to generate variable.`,
              },
            ],
          },
        ],
      },
    ],
  };
}
