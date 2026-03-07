export const dataMockCode = `import { TestBed } from '@angular/core/testing';
import { NgxApiMimicMockData, MockSchemaOf } from 'ngx-api-mimic';

const schema: MockSchemaOf<any> = {
  type: 'object',
  items: { 
    id: { type: 'number', min: 1, max: 10 } 
  }
};

describe('MyService', () => {
  it('should initialize completely independent mock data', () => {
    // Pass third argument "preventStore = true"
    // to bypass localStorage during unit tests
    const mockData = new NgxApiMimicMockData('test-store', schema, true);
    
    expect(mockData.data).toBeDefined();
    expect(mockData.data.id).toBeLessThanOrEqual(10);
  });
});`;

export const apiMockCode = `import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ngxApiMimicRouterFactory, ngxApiMockInterceptorFactory } from 'ngx-api-mimic';
import { UsersController } from './users.controller'; // Your mock controller

describe('Testing with API Mock directly', () => {
  let http: HttpClient;

  beforeEach(() => {
    const router = ngxApiMimicRouterFactory([UsersController]);
    
    // minDelay 0 and maxDelay 0 ensures lightning-fast test execution!
    const interceptor = ngxApiMockInterceptorFactory(router, { 
       minDelay: 0, 
       maxDelay: 0, 
       enableLog: false 
    });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([interceptor]))
      ]
    });

    http = TestBed.inject(HttpClient);
  });

  it('runs directly through the interceptor without HttpTestingController', async () => {
    const result = await firstValueFrom(http.get('/users'));
    expect(result).toBeDefined();
  });
});`;
