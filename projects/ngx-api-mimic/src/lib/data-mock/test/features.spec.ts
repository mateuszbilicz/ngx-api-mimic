// @vitest-environment jsdom
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { NgxApiMimicMockData } from '../mock-data';
import { MockSchemaOf } from '../../api/data-mock';

describe('NgxApiMimicMockData - Features', () => {
    const schema: MockSchemaOf<any> = {
        type: 'object',
        items: {
            a: { type: 'array', itemCount: 5, item: { type: 'number', min: 1, max: 5 } },
            b: {
                type: 'object',
                items: {
                    test: { type: 'string', minLength: 3, maxLength: 3, customCharset: 'abc' },
                    userId: { type: 'number', min: 123, max: 123 },
                },
            },
            c: {
                type: 'object',
                items: {
                    d: {
                        type: 'object',
                        items: {
                            e: { type: 'object', items: {} },
                        },
                    },
                },
            },
        },
    };

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('Initialization and Schema generation', () => {
        it('should generate complex nested structures from schema', () => {
            const target = new NgxApiMimicMockData('test-features', schema, true);
            const data = target.data;

            // Checking generated data shape
            expect(Array.isArray(data.a)).toBe(true);
            expect(data.a.length).toBe(5);
            data.a.forEach((val: number) => {
                expect(val).toBeGreaterThanOrEqual(1);
                expect(val).toBeLessThanOrEqual(5);
            });

            expect(typeof data.b).toBe('object');
            expect(data.b.test.length).toBe(3);
            expect(data.b.userId).toBe(123);

            expect(typeof data.c).toBe('object');
            expect(typeof data.c.d).toBe('object');
            expect(typeof data.c.d.e).toBe('object');
            expect(Object.keys(data.c.d.e).length).toBe(0);
        });
    });

    describe('Storage handling', () => {
        it('should prevent storage when noStore is true during instantiation', () => {
            const target = new NgxApiMimicMockData('no-store', schema, true);
            target._$setStore('no-store', { a: 1 });
            const storeVal = localStorage.getItem('mock-no-store');
            expect(storeVal).toBeNull();

            target._$getStore('no-store'); // returns target._data
            expect(target.data).toBe(target._$getStore('no-store'));

            target._$deleteStore('no-store'); // void
        });

        it('should read and write to LocalStorage if noStore is false', () => {
            const target = new NgxApiMimicMockData('with-store', schema, false);
            const storedVal = localStorage.getItem('mock-with-store');
            expect(storedVal).not.toBeNull();

            const parsed = JSON.parse(storedVal as string);
            expect(parsed.name).toBe('with-store');
            expect(parsed.value.b.userId).toBe(123); // testing data inside the payload
        });

        it('should restore from LocalStorage if value exists on instantiation', () => {
            const previousValue = {
                name: 'restore-store',
                savedAt: new Date().toISOString(),
                value: {
                    a: [9, 9, 9],
                    b: { test: 'zzz', userId: 999 },
                    c: { d: { e: {} } },
                },
            };

            localStorage.setItem('mock-restore-store', JSON.stringify(previousValue));

            const target = new NgxApiMimicMockData('restore-store', schema, false);

            // Data should equal what was inside local storage
            expect(target.data.a).toEqual([9, 9, 9]);
            expect(target.data.b.test).toBe('zzz');
            expect(target.data.b.userId).toBe(999);
        });

        it('should update LocalStorage when assigning new data', () => {
            const target = new NgxApiMimicMockData('update-store', schema, false);

            // Assigning new property value to trigger setter (note: setting data calls setter that updates store)
            target.data = { a: [1], b: { test: 'xyz', userId: 5 }, c: { d: { e: {} } } };

            const storedItem = localStorage.getItem('mock-update-store');
            expect(storedItem).not.toBeNull();

            const parsed = JSON.parse(storedItem as string);
            expect(parsed.value.a).toEqual([1]);
            expect(parsed.value.b.test).toBe('xyz');
        });

        it('should handle _$getStore defaultValue appropriately when null', () => {
            const target = new NgxApiMimicMockData('default-store', schema, false);
            target._$deleteStore('default-store');
            const val = target._$getStore('default-store', 'fallback');
            expect(val).toBe('fallback');
        });

        it('should delete store correctly', () => {
            const target = new NgxApiMimicMockData('delete-store', schema, false);
            expect(localStorage.getItem('mock-delete-store')).not.toBeNull();
            target._$deleteStore('delete-store');
            expect(localStorage.getItem('mock-delete-store')).toBeNull();
        });
    });
});
