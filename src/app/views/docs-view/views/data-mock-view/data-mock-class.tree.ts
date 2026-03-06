import {
  DescriptionTreeBranch,
  DescriptionTreeIconClass,
  DescriptionTreeIconMethod,
  DescriptionTreeIconProperty,
} from '../../../../core/api/description-tree';

export const dataMockClassTree: DescriptionTreeBranch = {
    title: 'Classes',
    description: `Classes available in Data Mock.`,
    items: [
        {
            title: 'NgxApiMimicMockData<T>',
            icon: DescriptionTreeIconClass,
            description: `Extends NgxApiMimicMockSchema<T>. Base for your data services. Use YourClass extends NgxApiMimicMockData<YourInterface>.`,
            items: [
                {
                    title: 'super(storeName: string, schema: MockSchemaOf, noStore?: boolean)',
                    icon: DescriptionTreeIconMethod,
                    description:
                        "In constructor of your class that extends this one, you'll need to add super(storeName: string, schema: MockSchemaOf, noStore?: boolean).",
                    items: [
                        {
                            title: 'storeName: string',
                            icon: DescriptionTreeIconProperty,
                            description: 'LocalStorage name of this mocked data.',
                        },
                        {
                            title: 'schema: MockSchemaOf',
                            icon: DescriptionTreeIconProperty,
                            description: `Data schematic object. Your IDE will give you hints on which value you can use in specific object - it's based on T type you've provided to NgxApiMimicMockData`,
                        },
                        {
                            title: 'noStore?: boolean',
                            icon: DescriptionTreeIconProperty,
                            description: `Disable LocalStorage store. Use it when you're writing schema to prevent saving and loading it from local storage.`,
                        },
                    ],
                },
                {
                    title: 'data: T',
                    icon: DescriptionTreeIconProperty,
                    description: `Data getter and setter, DO NOT USE data.push and other methods like that. To update data you'll need to do data = [...data, {}].`,
                },
                {
                    title: `name: string = 'blank'`,
                    icon: DescriptionTreeIconProperty,
                    description: 'Internal variable, LocalStorage store name.',
                },
                {
                    title: `preventStore: boolean = true`,
                    icon: DescriptionTreeIconProperty,
                    description: 'Internal variable, disable use of LocalStorage store.',
                },
                {
                    title: '_$setStore(name: string, value: T)',
                    icon: DescriptionTreeIconMethod,
                    description: 'Internal method, set store value (automatic, use data setter).',
                },
                {
                    title: '_$getStore(name: string, defaultValue?: any)',
                    icon: DescriptionTreeIconMethod,
                    description:
                        'Internal method, get store value from LocalStorage (automatic, use data getter).',
                },
                {
                    title: '_$deleteStore(name: string)',
                    icon: DescriptionTreeIconMethod,
                    description:
                        'Internal method, delete LocalStorage store - use it when you want to automatically delete LocalStorage store to force generating items after service constructor run next time.',
                },
            ],
        },
        {
            title: 'NgxApiMimicMockSchema<T>',
            icon: DescriptionTreeIconClass,
            description: `Base class for generating schematics. Contains set of internal functions and variables to generate data and let you use these methods inside your top-level class methods.`,
            items: [
                {
                    title:
                        '_$generateVal(options: NgxApiMimicMockDataSchematic): number | string | boolean | Date | null | any',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates value from schematic object (recurrent).`,
                },
                {
                    title: '_$generateObjectFromSchema(obj: NgxApiMimicMockDataObjectValOptions): any',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates object of random data based on schema.`,
                },
                {
                    title: '_$generateArrayFromSchema(e: NgxApiMimicMockDataArrayValOptions): any[]',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates array of random data based on schema.`,
                },
                {
                    title:
                        '_$generateCustom(customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any): any',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, runs custom value generator functions, can be used for different objects that depends on specific value / enum.`,
                },
                {
                    title: '_$generatePassword(minLength: number, maxLength: number, customUpperCharset?: string, customLowerCharset?: string, customNumberCharset?: string, customSpecialCharset?: string): string',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random password based on given parameters.`,
                },
                {
                    title: '_$generateRandomEnum(enumArray: any[]): any',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random enum value based on given parameters.`,
                },
                {
                    title: '_$generateRandomFullName(): string',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random full name.`,
                },
                {
                    title: '_$generateEmailBasedOnName(firstName: string, lastName: string): string',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random email based on first name and last name.`,
                },
                {
                    title: '_$generateRandomEmail(): string',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random email.`,
                },
                {
                    title: '_$generateLastName(): string',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random last name.`,
                },
                {
                    title: '_$generateFirstName(): string',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random first name.`,
                },
                {
                    title: '_$generateRandomDate(dateStart: Date, dateEnd: Date): Date',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random date based on given parameters.`,
                },
                {
                    title: '_$generateRandomBool(): boolean',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random boolean.`,
                },
                {
                    title:
                        '_$generateRandomString(minLength: number, maxLength: number, customCharset?: string): string',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random string based on given parameters.`,
                },
                {
                    title:
                        '_$generateRandomNumber(min: number, max: number, round: boolean, precision: number): number',
                    icon: DescriptionTreeIconMethod,
                    description: `Internal method, generates random number based on given parameters.`,
                },
                {
                    title: 'customFnInstructions: NgxApiMimicMockCustomFunctionInstructions',
                    icon: DescriptionTreeIconProperty,
                    description: `Internal variable, instruction set for customFn.`,
                },
            ],
        },
    ],
};
