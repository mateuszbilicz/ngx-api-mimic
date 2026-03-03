import { Body, Controller, Delete, Get, Post, Put, Query, UrlParam } from '../api-mock/mock-classes/mock-decorators';
import { ngxApiMimicRouterFactory } from '../api-mock/mock-classes/api-mock-router';
import { ngxApiMockInterceptorFactory } from '../api-mock/api-mock.interceptor';
import { UsingSchema } from './using-schema.decorator';

interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
}

interface User extends UserCreate {
  id: string;
}

interface UserList {
  items: User[];
  totalCount: number;
}

@Controller('users')
@UsingSchema<UserList>('users', {
  type: 'object',
  items: {
    items: {
      type: 'array',
      itemCount: 100,
      item: {
        type: 'object',
        items: {
          id: {
            type: 'string',
          },
          firstName: {
            type: 'firstName',
          },
          lastName: {
            type: 'lastName',
          },
          email: {
            type: 'email',
          },
          age: {
            type: 'number',
            min: 18,
            max: 100,
            precision: 0,
            round: true,
          },
          password: {
            type: 'password',
          },
        },
      },
    },
    totalCount: {
      type: 'static',
      value: 100,
    },
  },
})
class UsersController {
  data!: UserList;

  @Get('/list')
  listUsers(
    @Query('textFilter') textFilter: string,
    @Query('start') start = 0,
    @Query('count') count = 10,
  ) {
    textFilter = textFilter.toLowerCase();
    start = Number(start);
    count = Number(count);
    return {
      items: this.data.items
        .filter(
          (user) =>
            user.firstName.includes(textFilter) ||
            user.lastName.includes(textFilter) ||
            user.email.includes(textFilter),
        )
        .slice(start, start + count),
      totalCount: this.data.totalCount,
    };
  }

  @Get('/:id')
  getUserById(@UrlParam('id') id: string) {
    return this.data.items.filter((item) => item.id === id)[0];
  }

  @Post('/')
  createUser(@Body() userCreate: UserCreate) {
    const newUser = {
      ...userCreate,
      id: Math.round(Math.random() * 999999).toString(36) + Date.now().toString(36),
    };
    this.data = {
      items: [
        ...this.data.items,
        newUser
      ],
      totalCount: this.data.totalCount + 1
    }
    return newUser;
  }

  @Put('/:id')
  updateUser(
    @UrlParam('id') id: string,
    @Body() userUpdate: Partial<UserCreate>
  ) {
    const currentUser = this.data.items.filter(user => user.id === id)[0];
    if (!currentUser) throw new Error('User not found');
    const updatedUser = {
      ...currentUser,
      ...userUpdate,
    };
    this.data = {
      items: this.data.items.map(user => {
        if (user.id !== id) return user;
        return updatedUser;
      }),
      totalCount: this.data.totalCount
    }
    return updatedUser;
  }

  @Delete('/:id')
  deleteUser(@UrlParam('id') id: string) {
    this.data = {
      items: this.data.items.filter(user => user.id !== id),
      totalCount: this.data.totalCount - 1
    }
    return {ok: true};
  }
}

const interceptor = ngxApiMockInterceptorFactory(ngxApiMimicRouterFactory([UsersController]));
