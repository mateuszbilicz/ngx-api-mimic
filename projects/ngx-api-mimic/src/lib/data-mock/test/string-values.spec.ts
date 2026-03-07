// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { NgxApiMimicMockSchema } from '../mock-schema';

describe('NgxApiMimicMockSchema - String values', () => {
    const schema = new NgxApiMimicMockSchema<any>();

    describe('_$generateRandomString', () => {
        it('should generate a string with correct length', () => {
            const result = schema._$generateRandomString(10, 10);
            expect(result.length).toBe(10);
        });

        it('should generate a string within length bounds', () => {
            const result = schema._$generateRandomString(5, 15);
            expect(result.length).toBeGreaterThanOrEqual(5);
            expect(result.length).toBeLessThanOrEqual(15);
        });

        it('should use custom charset if provided', () => {
            const charset = 'abc';
            const result = schema._$generateRandomString(10, 10, charset);
            const allCharsValid = Array.from(result).every(char => charset.includes(char));
            expect(allCharsValid).toBe(true);
        });
    });

    describe('_$generatePassword', () => {
        it('should throw an error if minLength < 4', () => {
            expect(() => schema._$generatePassword(3, 10)).toThrowError('Effective password must have at least 4 characters');
        });

        it('should generate password of correct length', () => {
            const pw = schema._$generatePassword(10, 10);
            expect(pw.length).toBe(10);
        });

        it('should use custom lower charset when generating passwords', () => {
            // By default password has 1 upper, 1 number, 1 special, and the rest is lower.
            // So if length is 10, there are 7 lower chars.
            const pw = schema._$generatePassword(10, 10, 'A', 'x', '1', '!');
            expect(pw).toContain('A');
            expect(pw).toContain('1');
            expect(pw).toContain('!');
            expect(pw).toContain('xxxxxxx');
        });

        it('should adhere to custom charsets', () => {
            const pw = schema._$generatePassword(8, 8, 'Z', 'y', '2', '@');
            expect(pw).toContain('Z');
            expect(pw).toContain('y');
            expect(pw).toContain('2');
            expect(pw).toContain('@');

            const charCountZ = Array.from(pw).filter(c => c === 'Z').length;
            expect(charCountZ).toBe(1);
        });

        it('should generate random password falling back to default charsets', () => {
            const pw = schema._$generatePassword(16, 20);
            expect(pw.length).toBeGreaterThanOrEqual(16);
            expect(pw.length).toBeLessThanOrEqual(20);
            // Check if contains at least one default special char, number, upper, lower.
            expect(/[A-Z]/.test(pw)).toBe(true);
            expect(/[a-z]/.test(pw)).toBe(true);
            expect(/[0-9]/.test(pw)).toBe(true);
            expect(/[@$!%*#?&]/.test(pw)).toBe(true);
        });
    });

    describe('_$generateVal for string types', () => {
        it('should generate valid string from schema configuration', () => {
            const result = schema._$generateVal({
                type: 'string',
                minLength: 5,
                maxLength: 5,
                customCharset: 'x'
            });
            expect(result).toBe('xxxxx');
        });

        it('should fallback to defaults for string', () => {
            const result = schema._$generateVal({ type: 'string' });
            expect(typeof result).toBe('string');
            expect((result as string).length).toBeGreaterThanOrEqual(8);
            expect((result as string).length).toBeLessThanOrEqual(32);
        });

        it('should generate valid first name', () => {
            const result = schema._$generateVal({ type: 'firstName' });
            expect(typeof result).toBe('string');
            expect((result as string).length).toBeGreaterThan(0);
        });

        it('should generate valid last name', () => {
            const result = schema._$generateVal({ type: 'lastName' });
            expect(typeof result).toBe('string');
            expect((result as string).length).toBeGreaterThan(0);
        });

        it('should generate valid full name', () => {
            const result = schema._$generateVal({ type: 'fullName' });
            expect(typeof result).toBe('string');
            expect((result as string).includes(' ')).toBe(true);
        });

        it('should generate valid email', () => {
            const result = schema._$generateVal({ type: 'email' });
            expect(typeof result).toBe('string');
            expect((result as string).includes('@')).toBe(true);
        });

        it('should generate valid nameEmail', () => {
            const result = schema._$generateVal({ type: 'nameEmail', firstName: 'john', lastName: 'doe' });
            expect(typeof result).toBe('string');
            expect(result).toMatch(/john\.?doe@test\.com/i);
        });

        it('should generate valid password from schema', () => {
            const result = schema._$generateVal({ type: 'password', minLength: 5, maxLength: 5, customLowerCharset: 'a', customUpperCharset: 'A', customNumberCharset: '1', customSpecialCharset: '!' });
            expect(typeof result).toBe('string');
            expect((result as string).length).toBe(5);
        });
    });
});
