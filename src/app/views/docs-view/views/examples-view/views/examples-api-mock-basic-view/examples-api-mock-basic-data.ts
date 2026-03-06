export const classCode = `import { Controller, Get, Post } from 'ngx-api-mimic';

@Controller('basic-api')
export class ApiMockBasicController {
  private count = 0;

  @Get('/ping')
  ping() {
    return { message: 'Pong!' };
  }

  @Get('/count')
  getCount() {
    return { count: this.count };
  }

  @Post('/increment')
  increment() {
    this.count++;
    return { count: this.count };
  }
}`;

export const routerCode = `import { ngxApiMimicRouterFactory, ngxApiMockInterceptorFactory } from 'ngx-api-mimic';
import { ApiMockBasicController } from './api-mock-basic-example';

const router = ngxApiMimicRouterFactory([ApiMockBasicController]);
router.usePrefix('api-mock-basic-example');
export const apiMockBasicExampleInterceptor = ngxApiMockInterceptorFactory(router);`;

