// @vitest-environment jsdom
import '../../test-setup';
import { describe, expect, it, beforeEach } from 'vitest';
import { firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandlerFn, HttpResponse, HttpHeaders } from '@angular/common/http';
import {
    Controller,
    Get,
    Post,
    Body,
    UrlParam,
    Query,
    Headers
} from '../mock-classes/mock-decorators';
import { ngxApiMimicRouterFactory } from '../mock-classes/api-mock-router';
import { ngxApiMockInterceptorFactory } from '../api-mock.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';
import {
    ParseIntPipe,
    ParseUUIDPipe,
    DefaultValuePipe,
    ParseFloatPipe,
    ParseBoolPipe,
    ParseDatePipe,
    ParseEnumPipe,
    ParseArrayPipe,
    ParseFilePipe
} from '../api-mock-pipes';

enum TestEnum {
    ONE = 'one',
    TWO = 'two'
}

@Controller('params')
class ParamsController {
    @Get('int/:id')
    getInt(@UrlParam('id', ParseIntPipe) id: number) {
        return { type: typeof id, value: id };
    }

    @Get('uuid')
    getUUID(@Query('id', ParseUUIDPipe) id: string) {
        return { type: typeof id, value: id };
    }

    @Get('default')
    getDefault(@Query('q', new DefaultValuePipe('hello')) q: string) {
        return { type: typeof q, value: q };
    }

    @Get('float/:val')
    getFloat(@UrlParam('val', ParseFloatPipe) val: number) {
        return { type: typeof val, value: val };
    }

    @Get('bool')
    getBool(@Query('flag', ParseBoolPipe) flag: boolean) {
        return { type: typeof flag, value: flag };
    }

    @Get('date')
    getDate(@Headers('Date-Header', ParseDatePipe) date: Date) {
        return { type: 'Date', valid: !isNaN(date.getTime()) };
    }

    @Get('enum/:val')
    getEnum(@UrlParam('val', new ParseEnumPipe(TestEnum)) val: TestEnum) {
        return { type: typeof val, value: val };
    }

    @Post('array')
    postArray(@Body(ParseArrayPipe) arr: any[]) {
        return { type: 'Array', isArray: Array.isArray(arr), value: arr };
    }

    @Post('file')
    postFile(@Body(ParseFilePipe) file: Blob) {
        return { type: 'Blob', isBlob: file instanceof Blob };
    }

    @Post('multi/:id')
    postMulti(
        @UrlParam('id', ParseIntPipe) id: number,
        @Body(ParseArrayPipe) body: any[],
        @Query('q', new DefaultValuePipe('query')) query: string,
        @Headers('Auth-Token') token: string
    ) {
        return {
            id,
            body,
            query,
            token
        };
    }
}

describe('API Mock - Params Controller and Pipes', () => {
    let interceptor: HttpInterceptorFn;
    const mockNext: HttpHandlerFn = (req) => of(new HttpResponse({ status: 404, statusText: 'Not Found' }));

    beforeEach(() => {
        const router = ngxApiMimicRouterFactory([ParamsController]);
        interceptor = ngxApiMockInterceptorFactory(router, { minDelay: 0, maxDelay: 0, enableLog: false });
    });

    async function sendReq(method: string, url: string, body?: any, headersObj: Record<string, string> = {}) {
        let headers = new HttpHeaders();
        for (const [k, v] of Object.entries(headersObj)) {
            headers = headers.set(k, v);
        }
        const req = new HttpRequest(method, url, body, { headers });
        Object.defineProperty(req, 'urlWithParams', { value: url });
        return firstValueFrom(interceptor(req, mockNext).pipe(catchError(e => of(e)))) as Promise<any>;
    }

    describe('ParseIntPipe', () => {
        it('should parse valid int', async () => {
            const res = await sendReq('GET', '/params/int/123');
            expect(res.body.value).toBe(123);
            expect(res.body.type).toBe('number');
        });

        it('should throw 400 for invalid int', async () => {
            const res: any = await sendReq('GET', '/params/int/abc');
            expect(res.status).toBe(400);
            expect(res.error.message).toContain('Validation failed (numeric string is expected)');
        });
    });

    describe('ParseUUIDPipe', () => {
        it('should parse valid uuid', async () => {
            const validUuid = '123e4567-e89b-12d3-a456-426614174000';
            const res = await sendReq('GET', `/params/uuid?id=${validUuid}`);
            expect(res.body.value).toBe(validUuid);
        });

        it('should throw 400 for invalid uuid', async () => {
            const res: any = await sendReq('GET', '/params/uuid?id=invalid');
            expect(res.status).toBe(400);
        });
    });

    describe('DefaultValuePipe', () => {
        it('should use provided value if exists', async () => {
            const res = await sendReq('GET', '/params/default?q=world');
            expect(res.body.value).toBe('world');
        });

        it('should use default value if missing', async () => {
            const res = await sendReq('GET', '/params/default');
            expect(res.body.value).toBe('hello');
        });
    });

    describe('ParseFloatPipe', () => {
        it('should parse valid float', async () => {
            const res = await sendReq('GET', '/params/float/12.34');
            expect(res.body.value).toBe(12.34);
        });

        it('should throw 400 for invalid float', async () => {
            const res: any = await sendReq('GET', '/params/float/abc');
            expect(res.status).toBe(400);
        });
    });

    describe('ParseBoolPipe', () => {
        it('should parse valid strings to boolean', async () => {
            let res = await sendReq('GET', '/params/bool?flag=true');
            expect(res.body.value).toBe(true);
            res = await sendReq('GET', '/params/bool?flag=1');
            expect(res.body.value).toBe(true);
            res = await sendReq('GET', '/params/bool?flag=false');
            expect(res.body.value).toBe(false);
            res = await sendReq('GET', '/params/bool?flag=0');
            expect(res.body.value).toBe(false);
        });

        it('should throw 400 for invalid boolean', async () => {
            const res: any = await sendReq('GET', '/params/bool?flag=invalid');
            expect(res.status).toBe(400);
        });
    });

    describe('ParseDatePipe', () => {
        it('should parse valid date strings', async () => {
            const d = new Date().toISOString();
            const res = await sendReq('GET', '/params/date', null, { 'Date-Header': d });
            expect(res.body.valid).toBe(true);
        });

        it('should throw 400 for invalid date', async () => {
            const res: any = await sendReq('GET', '/params/date', null, { 'Date-Header': 'invalid-date' });
            expect(res.status).toBe(400);
        });
    });

    describe('ParseEnumPipe', () => {
        it('should parse valid enum value', async () => {
            const res = await sendReq('GET', '/params/enum/one');
            expect(res.body.value).toBe('one');
        });

        it('should throw 400 for invalid enum', async () => {
            const res: any = await sendReq('GET', '/params/enum/invalid');
            expect(res.status).toBe(400);
        });
    });

    describe('ParseArrayPipe', () => {
        it('should parse comma-separated string to array', async () => {
            const res = await sendReq('POST', '/params/array', 'a,b,c');
            expect(res.body.isArray).toBe(true);
            expect(res.body.value).toEqual(['a', 'b', 'c']);
        });

        it('should accept existing array', async () => {
            const res = await sendReq('POST', '/params/array', ['a', 'b', 'c']);
            expect(res.body.isArray).toBe(true);
            expect(res.body.value).toEqual(['a', 'b', 'c']);
        });

        it('should throw 400 for invalid array type', async () => {
            const res: any = await sendReq('POST', '/params/array', 123);
            expect(res.status).toBe(400);
        });
    });

    describe('ParseFilePipe', () => {
        it('should accept Blob or File', async () => {
            const blob = new Blob(['content']);
            const res = await sendReq('POST', '/params/file', blob);
            expect(res.body.isBlob).toBe(true);
        });

        it('should throw 400 for non-Blob', async () => {
            const res: any = await sendReq('POST', '/params/file', { notFile: true });
            expect(res.status).toBe(400);
        });
    });

    describe('Multiple decorators at once', () => {
        it('should parse multiple args successfully', async () => {
            const bodyParams = ['body1', 'body2'];
            const res = await sendReq('POST', '/params/multi/12?q=custom-query', bodyParams, { 'Auth-Token': 'secret-token' });
            expect(res.body.id).toBe(12);
            expect(res.body.body).toEqual(bodyParams);
            expect(res.body.query).toBe('custom-query');
            expect(res.body.token).toBe('secret-token');
        });
    });
});
