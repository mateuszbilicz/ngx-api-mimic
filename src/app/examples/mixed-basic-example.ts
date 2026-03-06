import {
  Body,
  Controller,
  Delete,
  Get,
  ngxApiMimicRouterFactory,
  ngxApiMockInterceptorFactory,
  Post,
  Put,
  Query,
  UrlParam,
  UsingSchema,
} from 'ngx-api-mimic';

export interface MixedBasic_UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
}

export interface MixedBasic_User extends MixedBasic_UserCreate {
  id: string;
}

export interface MixedBasic_UserList {
  items: MixedBasic_User[];
  totalCount: number;
}

@Controller('users')
@UsingSchema<MixedBasic_UserList>('users', {
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
  data!: MixedBasic_UserList;

  @Get('/list')
  listUsers(
    @Query('textFilter') textFilter = '',
    @Query('skip') skip: number = 0,
    @Query('count') count: number = 10,
  ) {
    textFilter = (textFilter || '').toLowerCase();
    skip = skip || 0;
    count = count || 10;
    return {
      items: this.data.items
        .filter(
          (user) =>
            user.firstName.includes(textFilter) ||
            user.lastName.includes(textFilter) ||
            user.email.includes(textFilter),
        )
        .slice(skip, skip + count),
      totalCount: this.data.totalCount,
    };
  }

  @Get('/:id')
  getUserById(@UrlParam('id') id: string) {
    return this.data.items.find((item) => item.id === id);
  }

  @Post('/')
  createUser(@Body() userCreate: MixedBasic_UserCreate) {
    const newUser = {
      ...userCreate,
      id: Math.round(Math.random() * 999999).toString(36) + Date.now().toString(36),
    };
    this.data = {
      items: [...this.data.items, newUser],
      totalCount: this.data.totalCount + 1,
    };
    return newUser;
  }

  @Put('/:id')
  updateUser(@UrlParam('id') id: string, @Body() userUpdate: Partial<MixedBasic_UserCreate>) {
    const currentUser = this.data.items.find((user) => user.id === id);
    if (!currentUser) throw new Error('User not found');
    const updatedUser = {
      ...currentUser,
      ...userUpdate,
    };
    this.data = {
      items: this.data.items.map((user) => {
        if (user.id !== id) return user;
        return updatedUser;
      }),
      totalCount: this.data.totalCount,
    };
    return updatedUser;
  }

  @Delete('/:id')
  deleteUser(@UrlParam('id') id: string) {
    this.data = {
      items: this.data.items.filter((user) => user.id !== id),
      totalCount: this.data.totalCount - 1,
    };
    return { ok: true };
  }
}

const router = ngxApiMimicRouterFactory([UsersController]);
router.usePrefix('mixed-basic-example');
export const mixedBasicExampleInterceptor = ngxApiMockInterceptorFactory(router);
