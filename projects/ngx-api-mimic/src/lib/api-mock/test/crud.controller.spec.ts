// @vitest-environment jsdom
import '../../test-setup';
import { describe, expect, it, beforeEach } from 'vitest';
import { firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    UrlParam
} from '../mock-classes/mock-decorators';
import { ngxApiMimicRouterFactory } from '../mock-classes/api-mock-router';
import { ngxApiMockInterceptorFactory } from '../api-mock.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';

// Define Controller
@Controller('users')
class UsersController {
    private users: any[] = [{ id: 1, name: 'Alice' }];

    @Get('')
    getAll() {
        return this.users;
    }

    @Get('/:id')
    getOne(@UrlParam('id') id: string) {
        return this.users.find(u => u.id === Number(id));
    }

    @Post('')
    create(@Body() body: any) {
        const newUser = { id: this.users.length + 1, ...body };
        this.users.push(newUser);
        return newUser;
    }

    @Put('/:id')
    update(@UrlParam('id') id: string, @Body() body: any) {
        const user = this.users.find(u => u.id === Number(id));
        if (user) {
            Object.assign(user, body);
            return user;
        }
        return null;
    }

    @Delete('/:id')
    delete(@UrlParam('id') id: string) {
        const index = this.users.findIndex(u => u.id === Number(id));
        if (index > -1) {
            this.users.splice(index, 1);
            return { success: true };
        }
        return { success: false };
    }
}

describe('API Mock - CRUD Controller', () => {
    let interceptor: HttpInterceptorFn;
    const mockNext: HttpHandlerFn = (req) => of(new HttpResponse({ status: 404, statusText: 'Not Found' }));

    beforeEach(() => {
        const router = ngxApiMimicRouterFactory([UsersController]);
        interceptor = ngxApiMockInterceptorFactory(router, { minDelay: 0, maxDelay: 0, enableLog: false });
    });

    async function sendReq(method: string, url: string, body?: any) {
        const req = new HttpRequest(method, url, body);
        Object.defineProperty(req, 'urlWithParams', { value: url });
        return firstValueFrom(interceptor(req, mockNext).pipe(catchError(e => of(e)))) as Promise<any>;
    }

    it('should GET all users', async () => {
        const res = await sendReq('GET', '/users');
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe('Alice');
    });

    it('should GET one user by param', async () => {
        const res = await sendReq('GET', '/users/1');
        expect(res.body.id).toBe(1);
        expect(res.body.name).toBe('Alice');
    });

    it('should POST a new user', async () => {
        const res = await sendReq('POST', '/users', { name: 'Bob' });
        expect(res.body.id).toBe(2);
        expect(res.body.name).toBe('Bob');

        const all = await sendReq('GET', '/users');
        expect(all.body.length).toBe(2);
    });

    it('should PUT to update a user', async () => {
        const res = await sendReq('PUT', '/users/1', { name: 'Alice Updated' });
        expect(res.body.name).toBe('Alice Updated');
        const getRes = await sendReq('GET', '/users/1');
        expect(getRes.body.name).toBe('Alice Updated');
    });

    it('should DELETE a user', async () => {
        const res = await sendReq('DELETE', '/users/1');
        expect(res.body.success).toBe(true);

        const all = await sendReq('GET', '/users');
        expect(all.body.length).toBe(0);
    });

    it('should throw 404 for unknown routes', async () => {
        const res = await sendReq('GET', '/unknown-route');
        expect(res).toBeDefined();
        expect(res.status).toBe(404);
    });
});
