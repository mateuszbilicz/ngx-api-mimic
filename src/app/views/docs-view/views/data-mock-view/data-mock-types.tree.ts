import {
    DescriptionTreeBranch,
    DescriptionTreeIconInterface,
    DescriptionTreeIconMethod,
    DescriptionTreeIconProperty,
    DescriptionTreeIconType
} from '../../../../core/api/description-tree';

export const dataMockTypesTree: DescriptionTreeBranch = {
    title: 'Types and interfaces',
    description: `Types and interfaces exported by Data Mock.`,
    items: [
        {
            title: 'MockSchemaOf<T>',
            icon: DescriptionTreeIconType,
            description: `Type that converts interfaces and types into value schematics hints to help devs write schematics.`,
        },
        {
            title: 'NgxApiMimicMockDataType',
            icon: DescriptionTreeIconType,
            description: `Mock schematic data type.`,
        },
        {
            title: 'NgxApiMimicMockDataSchematic',
            icon: DescriptionTreeIconType,
            description: `Mock data value options type.`,
            items: [
                {
                    title: 'NgxApiMimicMockDataValOptionsBase',
                    icon: DescriptionTreeIconInterface,
                    description: `Base mock data value options interface.`,
                    items: [
                        {
                            title: 'type: NgxApiMimicMockDataType',
                            icon: DescriptionTreeIconProperty,
                            description: `Type of mock schematic object.`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataNumberValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. Number mock data value options interface.`,
                    items: [
                        {
                            title: 'min?: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Minimum number.`,
                        },
                        {
                            title: 'max?: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Maximum number.`,
                        },
                        {
                            title: 'round?: boolean',
                            icon: DescriptionTreeIconProperty,
                            description: `Round number.`,
                        },
                        {
                            title: 'precision?: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Number precision.`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataStringValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. String mock data value options interface.`,
                    items: [
                        {
                            title: 'minLength?: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Minimum string length.`,
                        },
                        {
                            title: 'maxLength?: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Maximum string length.`,
                        },
                        {
                            title: 'customCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom charset to generate string from.`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataBooleanValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. Boolean mock data value options interface.`,
                },
                {
                    title: 'NgxApiMimicMockDataDateValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. Date mock data value options interface.`,
                    items: [
                        {
                            title: 'dateStart?: Date',
                            icon: DescriptionTreeIconProperty,
                            description: `Minimum date.`,
                        },
                        {
                            title: 'dateEnd?: Date',
                            icon: DescriptionTreeIconProperty,
                            description: `Maximum date.`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataEnumValOptions<T = any>',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. Enum mock data value options interface.`,
                    items: [
                        {
                            title: 'enum: T[]',
                            icon: DescriptionTreeIconProperty,
                            description: `Enum (array of elements to select one from)`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataFirstNameValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. FirstName mock data value options interface.`,
                },
                {
                    title: 'NgxApiMimicMockDataLastNameValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. LastName mock data value options interface.`,
                },
                {
                    title: 'NgxApiMimicMockDataFullNameValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. FullName mock data value options interface.`,
                },
                {
                    title: 'NgxApiMimicMockDataEmailValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. Email mock data value options interface.`,
                },
                {
                    title: 'NgxApiMimicMockDataNameEmailValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. NameEmail mock data value options interface.`,
                    items: [
                        {
                            title: 'firstName?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `First name.`,
                        },
                        {
                            title: 'lastName?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Last name.`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataPasswordValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. Password mock data value options interface.`,
                    items: [
                        {
                            title: 'minLength?: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Minimum password length.`,
                        },
                        {
                            title: 'maxLength?: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Maximum password length.`,
                        },
                        {
                            title: 'customUpperCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom upper letters characters to generate password from.`,
                        },
                        {
                            title: 'customLowerCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom lower letters characters to generate password from.`,
                        },
                        {
                            title: 'customNumberCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom number characters to generate password from.`,
                        },
                        {
                            title: 'customSpecialCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom special characters to generate password from.`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataObjectValOptions<T = any>',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. Schematic object mock value options interface.`,
                    items: [
                        {
                            title: 'staticValue?: T',
                            icon: DescriptionTreeIconProperty,
                            description: `Static object value.`,
                        },
                        {
                            title: 'items: { [K in keyof T]: MockSchemaOf<T[K]> }',
                            icon: DescriptionTreeIconProperty,
                            description: `Items of the object to generate by schematic.`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataArrayValOptions<T = any>',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. Schematic array mock value options interface.`,
                    items: [
                        {
                            title: 'staticValue?: T[]',
                            icon: DescriptionTreeIconProperty,
                            description: `Static array value.`,
                        },
                        {
                            title: 'item: MockSchemaOf<T>',
                            icon: DescriptionTreeIconProperty,
                            description: `Array item schema definition.`,
                        },
                        {
                            title: 'itemCount: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Items count in the array.`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataCustomValOptions',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. Custom mock data value options interface.`,
                    items: [
                        {
                            title: 'customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any',
                            icon: DescriptionTreeIconMethod,
                            description: `Custom function to generate variable.`,
                        },
                    ],
                },
                {
                    title: 'NgxApiMimicMockDataStaticValOptions<T = any>',
                    icon: DescriptionTreeIconInterface,
                    description: `Extends NgxApiMimicMockDataValOptionsBase. .`,
                    items: [
                        {
                            title: 'value: T',
                            icon: DescriptionTreeIconProperty,
                            description: `Static value.`,
                        },
                    ],
                },
            ],
        },
        {
            title: 'NgxApiMimicMockCustomFunctionInstructions',
            icon: DescriptionTreeIconInterface,
            description: `Custom mock data type function parameters.`,
            items: [
                {
                    title:
                        'randomNumber: (min: number, max: number, round: boolean, precision: number) => number',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random number.`,
                    items: [
                        {
                            title: 'min: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Minimum number.`,
                        },
                        {
                            title: 'max: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Maximum number.`,
                        },
                        {
                            title: 'round: boolean',
                            icon: DescriptionTreeIconProperty,
                            description: `Round number.`,
                        },
                        {
                            title: 'precision: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Number precision.`,
                        },
                    ],
                },
                {
                    title:
                        'randomString: (minLength: number, maxLength: number, customCharset?: string) => string',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random string.`,
                    items: [
                        {
                            title: 'minLength: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Minimum string length.`,
                        },
                        {
                            title: 'maxLength: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Maximum string length.`,
                        },
                        {
                            title: 'customCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom charset to generate string from.`,
                        },
                    ],
                },
                {
                    title: 'randomBool: () => boolean',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random boolean.`,
                },
                {
                    title: 'randomDate: (dateStart: Date, dateEnd: Date) => Date',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random date.`,
                    items: [
                        {
                            title: 'dateStart: Date',
                            icon: DescriptionTreeIconProperty,
                            description: `Minimum date.`,
                        },
                        {
                            title: 'dateEnd: Date',
                            icon: DescriptionTreeIconProperty,
                            description: `Maximum date.`,
                        },
                    ],
                },
                {
                    title: 'firstName: () => string',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random first name.`,
                },
                {
                    title: 'lastName: () => string',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random last name.`,
                },
                {
                    title: 'randomFullName: () => string',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random full name.`,
                },
                {
                    title: 'randomEmail: () => string',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random email.`,
                },
                {
                    title: 'emailBasedOnName: (firstName: string, lastName: string) => string',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random email based on first name and last name.`,
                    items: [
                        {
                            title: 'firstName: string',
                            icon: DescriptionTreeIconProperty,
                            description: `First name.`,
                        },
                        {
                            title: 'lastName: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Last name.`,
                        },
                    ],
                },
                {
                    title: 'randomEnum: (enumArray: any[]) => any',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random enum.`,
                    items: [
                        {
                            title: 'enumArray: T[]',
                            icon: DescriptionTreeIconProperty,
                            description: `Enum (array of elements to select one from)`,
                        },
                    ],
                },
                {
                    title: 'password: (minLength: number, maxLength: number, customUpperCharset?: string, customLowerCharset?: string, customNumberCharset?: string, customSpecialCharset?: string) => string',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces random password.`,
                    items: [
                        {
                            title: 'minLength?: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Minimum password length.`,
                        },
                        {
                            title: 'maxLength?: number',
                            icon: DescriptionTreeIconProperty,
                            description: `Maximum password length.`,
                        },
                        {
                            title: 'customUpperCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom upper letters characters to generate password from.`,
                        },
                        {
                            title: 'customLowerCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom lower letters characters to generate password from.`,
                        },
                        {
                            title: 'customNumberCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom number characters to generate password from.`,
                        },
                        {
                            title: 'customSpecialCharset?: string',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom special characters to generate password from.`,
                        },
                    ],
                },
                {
                    title:
                        'custom: (customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any) => any',
                    icon: DescriptionTreeIconMethod,
                    description: `Produces value generated by custom function.`,
                    items: [
                        {
                            title: 'customFn: (options: NgxApiMimicMockCustomFunctionInstructions) => any',
                            icon: DescriptionTreeIconProperty,
                            description: `Custom function to generate variable.`,
                        },
                    ],
                },
            ],
        },
    ],
};
