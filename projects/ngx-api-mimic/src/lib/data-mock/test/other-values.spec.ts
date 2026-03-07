// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { NgxApiMimicMockSchema } from '../mock-schema';
import {
    NgxApiMimicMockCustomFunctionInstructions,
    NgxApiMimicMockDataSchematic
} from '../../api/data-mock';

describe('NgxApiMimicMockSchema - Other values', () => {
    let schema: NgxApiMimicMockSchema<any>;

    beforeEach(() => {
        schema = new NgxApiMimicMockSchema<any>();
    });

    describe('Numbers', () => {
        it('should generate valid number within range', () => {
            const result = schema._$generateRandomNumber(10, 20, false, 1);
            expect(result).toBeGreaterThanOrEqual(10);
            expect(result).toBeLessThanOrEqual(20);
        });

        it('should round numbers when asked', () => {
            const result = schema._$generateRandomNumber(1, 10, true, 1);
            expect(Number.isInteger(result)).toBe(true);
        });

        it('should apply precision correctly', () => {
            const result = schema._$generateRandomNumber(1, 10, false, 100);
            expect(result * 100).toBe(Math.round(result * 100)); // Precision to 2 decimal places essentially if precision = 100
        });

        it('should fallback to defaults when configuring schema', () => {
            const result = schema._$generateVal({ type: 'number' });
            expect(typeof result).toBe('number');
            expect(result as number).toBeGreaterThanOrEqual(0);
            expect(result as number).toBeLessThanOrEqual(100);
        });

        it('should follow schema min, max, precision, round', () => {
            const result = schema._$generateVal({ type: 'number', min: 5, max: 10, round: true, precision: 1 });
            expect(typeof result).toBe('number');
            expect(Number.isInteger(result)).toBe(true);
            expect(result).toBeGreaterThanOrEqual(4.5); // since it rounds, maybe 4.5 -> 5
            expect(result).toBeLessThanOrEqual(10.5);
        });
    });

    describe('Booleans', () => {
        it('should generate boolean values', () => {
            const result = schema._$generateRandomBool();
            expect(typeof result).toBe('boolean');
        });

        it('should generate boolean using schema', () => {
            const result = schema._$generateVal({ type: 'boolean' });
            expect(typeof result).toBe('boolean');
        });
    });

    describe('Dates', () => {
        it('should generate random dates within range', () => {
            const d1 = new Date(2020, 0, 1);
            const d2 = new Date(2021, 0, 1);
            const result = schema._$generateRandomDate(d1, d2);
            expect(result.getTime()).toBeGreaterThanOrEqual(d1.getTime());
            expect(result.getTime()).toBeLessThanOrEqual(d2.getTime());
        });

        it('should generate dates from schema', () => {
            const result = schema._$generateVal({ type: 'date' });
            expect(result instanceof Date).toBe(true);
        });

        it('should use provided ranges in schema', () => {
            const start = new Date(2010, 0, 1);
            const end = new Date(2020, 0, 1);
            const result = schema._$generateVal({ type: 'date', dateStart: start, dateEnd: end });
            expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
            expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
        });
    });

    describe('Enums', () => {
        it('should generate random enum value', () => {
            const enums = ['a', 'b', 'c'];
            const result = schema._$generateRandomEnum(enums);
            expect(enums).toContain(result);
        });

        it('should generate random enum value from schema', () => {
            const enums = [1, 2, 3];
            const result = schema._$generateVal({ type: 'enum', enum: enums });
            expect(enums).toContain(result);
        });

        it('should return undefined or error if enum array is empty and fallback logic?', () => {
            const result = schema._$generateRandomEnum([]);
            expect(result).toBeUndefined();

            // @ts-ignore
            const schemaResult = schema._$generateVal({ type: 'enum' });
            expect(schemaResult).toBeUndefined(); // default to [] which returns undefined
        });
    });

    describe('Custom', () => {
        it('should run custom generation function', () => {
            const customFn = vi.fn().mockReturnValue('custom');
            const result = schema._$generateCustom(customFn);
            expect(customFn).toHaveBeenCalled();
            expect(result).toBe('custom');
        });

        it('should pass instructions to custom function', () => {
            const customFn = vi.fn((inst: NgxApiMimicMockCustomFunctionInstructions) => {
                return inst.randomString(5, 5);
            });
            const result = schema._$generateCustom(customFn);
            expect(result.length).toBe(5);
        });

        it('should run custom from schema', () => {
            const customFn = vi.fn().mockReturnValue(1234);
            const result = schema._$generateVal({ type: 'custom', customFn });
            expect(result).toBe(1234);
        });
    });

    describe('Static', () => {
        it('should return static value exactly', () => {
            const obj = { foo: 'bar' };
            const result = schema._$generateVal({ type: 'static', value: obj });
            expect(result).toBe(obj);
        });
    });

    describe('Arrays', () => {
        it('should throw if no item schema defined', () => {
            const arraySchema: NgxApiMimicMockDataSchematic = { type: 'array', itemCount: 2 } as any;
            expect(() => schema._$generateArrayFromSchema(arraySchema as any)).toThrowError('No item schema defined for array');
        });

        it('should return static array if staticValue defined', () => {
            const staticArr = [1, 2, 3];
            const arraySchema: any = { type: 'array', staticValue: staticArr };
            expect(schema._$generateArrayFromSchema(arraySchema)).toBe(staticArr);
        });

        it('should generate array based on item count and schema', () => {
            const itemSchema: NgxApiMimicMockDataSchematic = { type: 'number', min: 1, max: 1 };
            const arraySchema: NgxApiMimicMockDataSchematic = { type: 'array', itemCount: 3, item: itemSchema };
            const result = schema._$generateArrayFromSchema(arraySchema as any);
            expect(result).toEqual([1, 1, 1]); // should exactly be 3 items of 1
        });

        it('should default to 0 items if not specified', () => {
            const itemSchema: NgxApiMimicMockDataSchematic = { type: 'number' };
            // @ts-ignore
            const arraySchema: NgxApiMimicMockDataSchematic = { type: 'array', item: itemSchema };
            const result = schema._$generateArrayFromSchema(arraySchema as any);
            expect(result).toEqual([]);
        });

        it('should generate array from val', () => {
            const result = schema._$generateVal({ type: 'array', itemCount: 2, item: { type: 'string', minLength: 2, maxLength: 2 } });
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(2);
        });
    });

    describe('Objects', () => {
        it('should throw if items schema not defined', () => {
            const objSchema: any = { type: 'object' };
            expect(() => schema._$generateObjectFromSchema(objSchema)).toThrowError('Items schema not defined in object');
        });

        it('should return static object if staticValue defined', () => {
            const staticObj = { a: 1 };
            const objSchema: any = { type: 'object', staticValue: staticObj };
            expect(schema._$generateObjectFromSchema(objSchema)).toBe(staticObj);
        });

        it('should generate object with respective fields', () => {
            const items = {
                name: { type: 'string', minLength: 4, maxLength: 4 } as NgxApiMimicMockDataSchematic,
                age: { type: 'number', min: 10, max: 10 } as NgxApiMimicMockDataSchematic,
            };
            const objSchema: any = { type: 'object', items };
            const result = schema._$generateObjectFromSchema(objSchema);

            expect(typeof result.name).toBe('string');
            expect(result.name.length).toBe(4);
            expect(result.age).toBeGreaterThanOrEqual(10);
            expect(result.age).toBeLessThanOrEqual(10);
        });

        it('should generate object from val', () => {
            const result = schema._$generateVal({ type: 'object', items: { flag: { type: 'boolean' } } });
            expect(typeof result.flag).toBe('boolean');
        });
    });

    describe('Default exhaustive checks', () => {
        it('should return null for undefined type', () => {
            const result = schema._$generateVal({ type: 'invalid' as any });
            expect(result).toBeNull();
        });
    });
});
