// @vitest-environment jsdom
import '../../test-setup';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandlerFn, HttpResponse, HttpHeaders } from '@angular/common/http';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    UrlParam
} from '../../api-mock/mock-classes/mock-decorators';
import { ngxApiMimicRouterFactory } from '../../api-mock/mock-classes/api-mock-router';
import { ngxApiMockInterceptorFactory } from '../../api-mock/api-mock.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';
import { NgxApiMimicMockData } from '../../data-mock/mock-data';
import { MockSchemaOf } from '../../api/data-mock';
import { ParseIntPipe } from '../../api-mock/api-mock-pipes';
import { UsingSchema } from '../using-schema.decorator';

// Schema Definition
interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

const productSchema: MockSchemaOf<{ products: Product[] }> = {
    type: 'object',
    items: {
        products: {
            type: 'array',
            itemCount: 3,
            item: {
                type: 'object',
                items: {
                    id: { type: 'number', min: 1, max: 1000, round: true },
                    name: { type: 'string', minLength: 5, maxLength: 10 },
                    price: { type: 'number', min: 10, max: 50, precision: 100 },
                    inStock: { type: 'boolean' }
                }
            }
        }
    }
};

@Controller('products')
@UsingSchema('products-store', productSchema)
class ProductsController {
    public data!: { products: Product[] };

    @Get('')
    getAll() {
        return this.data.products;
    }

    @Get(':id')
    getOne(@UrlParam('id', ParseIntPipe) id: number) {
        return this.data.products.find(p => p.id === id);
    }

    @Post('')
    create(@Body() body: any) {
        const d = this.data;
        const maxId = d.products.reduce((acc, p) => Math.max(acc, p.id), 0);
        const newProduct = { id: maxId + 1, ...body };
        d.products.push(newProduct);
        this.data = d; // trigger setter and localStorage update
        return newProduct;
    }

    @Put(':id')
    update(@UrlParam('id', ParseIntPipe) id: number, @Body() body: any) {
        const d = this.data;
        const index = d.products.findIndex(p => p.id === id);
        if (index > -1) {
            d.products[index] = { ...d.products[index], ...body };
            this.data = d; // save
            return d.products[index];
        }
        return null;
    }

    @Delete(':id')
    delete(@UrlParam('id', ParseIntPipe) id: number) {
        const d = this.data;
        const index = d.products.findIndex(p => p.id === id);
        if (index > -1) {
            d.products.splice(index, 1);
            this.data = d; // save
            return { success: true };
        }
        return { success: false };
    }
}

describe('API Mock - Mixed functionality (Data + API)', () => {
    let interceptor: HttpInterceptorFn;
    const mockNext: HttpHandlerFn = (req) => of(new HttpResponse({ status: 404, statusText: 'Not Found' }));

    beforeEach(() => {
        localStorage.clear();
        const router = ngxApiMimicRouterFactory([ProductsController]);
        interceptor = ngxApiMockInterceptorFactory(router, { minDelay: 0, maxDelay: 0, enableLog: false });
    });

    afterEach(() => {
        localStorage.clear();
    });

    async function sendReq(method: string, url: string, body?: any) {
        const req = new HttpRequest(method, url, body);
        Object.defineProperty(req, 'urlWithParams', { value: url });
        return firstValueFrom(interceptor(req, mockNext).pipe(catchError(e => of(e)))) as Promise<any>;
    }

    it('should generate random data on startup and retrieve via GET', async () => {
        const productsRes = await sendReq('GET', '/products');
        const products: Product[] = productsRes.body;
        expect(products.length).toBe(3);

        products.forEach(p => {
            expect(typeof p.id).toBe('number');
            expect(typeof p.name).toBe('string');
            expect(typeof p.price).toBe('number');
            expect(typeof p.inStock).toBe('boolean');
        });

        const saved = JSON.parse(localStorage.getItem('mock-products-store') || '{}');
        expect(saved.value.products.length).toBe(3);
    });

    it('should retrieve a single product using generated ID', async () => {
        const productsRes = await sendReq('GET', '/products');
        const products: Product[] = productsRes.body;
        const firstId = products[0].id;

        const singleRes = await sendReq('GET', `/products/${firstId}`);
        const singleProduct = singleRes.body;
        expect(singleProduct.id).toBe(firstId);
        expect(singleProduct.name).toBe(products[0].name);
    });

    it('should create new product and update mock-data local storage', async () => {
        const newProductRequest = { name: 'New Item', price: 99.99, inStock: true };
        const createdRes = await sendReq('POST', '/products', newProductRequest);
        const created: Product = createdRes.body;

        expect(created.name).toBe('New Item');

        const productsRes = await sendReq('GET', '/products');
        const products = productsRes.body;
        expect(products.length).toBe(4);

        const saved = JSON.parse(localStorage.getItem('mock-products-store') || '{}');
        expect(saved.value.products.length).toBe(4);
    });

    it('should update existing product via PUT', async () => {
        const productsRes = await sendReq('GET', '/products');
        const products: Product[] = productsRes.body;
        const firstId = products[0].id;

        const updatedRes = await sendReq('PUT', `/products/${firstId}`, { name: 'Updated Name', price: 0.1 });
        const updated = updatedRes.body;
        expect(updated.name).toBe('Updated Name');
        expect(updated.price).toBe(0.1);

        const saved = JSON.parse(localStorage.getItem('mock-products-store') || '{}');
        const locallySaved = saved.value.products.find((p: any) => p.id === firstId);
        expect(locallySaved.name).toBe('Updated Name');
    });

    it('should delete a product', async () => {
        const productsRes = await sendReq('GET', '/products');
        const products: Product[] = productsRes.body;
        const firstId = products[0].id;

        const res = await sendReq('DELETE', `/products/${firstId}`);
        expect(res.body.success).toBe(true);

        const listRes = await sendReq('GET', '/products');
        expect(listRes.body.length).toBe(2);

        const saved = JSON.parse(localStorage.getItem('mock-products-store') || '{}');
        expect(saved.value.products.length).toBe(2);
    });
});
