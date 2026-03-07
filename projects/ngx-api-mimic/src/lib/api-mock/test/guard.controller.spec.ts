// @vitest-environment jsdom
import '../../test-setup';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandlerFn, HttpResponse, HttpHeaders } from '@angular/common/http';
import {
    Controller,
    Get,
    UseGuards
} from '../mock-classes/mock-decorators';
import { ngxApiMimicRouterFactory } from '../mock-classes/api-mock-router';
import { ngxApiMockInterceptorFactory } from '../api-mock.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';
import { CanActivate, NgxApiMimicExecutionContext } from '../../api/api-mock';

class MockGlobalGuard implements CanActivate {
    canActivate(context: NgxApiMimicExecutionContext) {
        const headers = context.getRequest().headers;
        return headers.has('Authorization');
    }
}

class MockMethodGuard implements CanActivate {
    canActivate(context: NgxApiMimicExecutionContext) {
        const headers = context.getRequest().headers;
        return headers.get('Role') === 'Admin';
    }
}

class AsyncGuard implements CanActivate {
    canActivate(context: NgxApiMimicExecutionContext) {
        return Promise.resolve(true);
    }
}

class ObservableGuard implements CanActivate {
    canActivate(context: NgxApiMimicExecutionContext) {
        return of(true);
    }
}

@Controller('secure')
@UseGuards(MockGlobalGuard)
class SecureController {
    @Get('public-info') // actually protected by global guard
    getPublic() {
        return { data: 'public' };
    }

    @Get('admin-info')
    @UseGuards(MockMethodGuard)
    getAdmin() {
        return { data: 'admin' };
    }

    @Get('async-method')
    @UseGuards(AsyncGuard, ObservableGuard)
    getAsync() {
        return { data: 'async' };
    }
}

describe('API Mock - Guard Controller', () => {
    let interceptor: HttpInterceptorFn;
    const mockNext: HttpHandlerFn = (req) => of(new HttpResponse({ status: 404, statusText: 'Not Found' }));

    beforeEach(() => {
        const router = ngxApiMimicRouterFactory([SecureController]);
        interceptor = ngxApiMockInterceptorFactory(router, { minDelay: 0, maxDelay: 0, enableLog: false });
    });

    async function sendReq(method: string, url: string, headersObj: Record<string, string> = {}) {
        let headers = new HttpHeaders();
        for (const [k, v] of Object.entries(headersObj)) {
            headers = headers.set(k, v);
        }
        const req = new HttpRequest(method, url, null, { headers });
        Object.defineProperty(req, 'urlWithParams', { value: url });
        return firstValueFrom(interceptor(req, mockNext).pipe(
            catchError(error => of(error))
        )) as Promise<any>;
    }

    it('should deny access without global guard pass', async () => {
        const res: any = await sendReq('GET', '/secure/public-info');
        expect(res.status).toBe(403);
    });

    it('should allow access with global guard pass', async () => {
        const res = await sendReq('GET', '/secure/public-info', { Authorization: 'Bearer token' });
        expect(res.body.data).toBe('public');
    });

    it('should deny access if method guard fails even if global passes', async () => {
        const res: any = await sendReq('GET', '/secure/admin-info', { Authorization: 'Bearer token', Role: 'User' });
        expect(res.status).toBe(403);
    });

    it('should allow access if both global and method guards pass', async () => {
        const res = await sendReq('GET', '/secure/admin-info', { Authorization: 'Bearer token', Role: 'Admin' });
        expect(res.body.data).toBe('admin');
    });

    it('should handle async guards (promise, observable) properly', async () => {
        const res = await sendReq('GET', '/secure/async-method', { Authorization: 'Bearer token' });
        expect(res.body.data).toBe('async');
    });
});
