import { ngxApiMimicRouterFactory } from './mock-classes/api-mock-router';
import { Controller, Get } from './mock-classes/mock-decorators';
import { ngxApiMockInterceptorFactory } from './api-mock.interceptor';

@Controller('users')
class UsersController {
  @Get('/:id')
  getUserById(id: string) {
    return {id, name: 'User name #' + id}
  }
}

const interceptor = ngxApiMockInterceptorFactory(
  ngxApiMimicRouterFactory([UsersController])
);
