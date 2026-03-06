export const interfacesCode = `interface MixedAdvanced_UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
}

const UserRoles = ['USER', 'MODERATOR', 'ADMIN'] as const;

type UserRole = (typeof UserRoles)[number];

interface MixedAdvanced_User extends MixedAdvanced_UserCreate {
  id: string;
  role: UserRole;
  createDate: Date;
}

interface MixedAdvanced_UserList {
  items: MixedAdvanced_User[];
  totalCount: number;
}`;

export const pipeCode = `import { PipeTransform, ArgumentMetadata, NgxApiMimicException } from 'ngx-api-mimic';
import { MixedAdvanced_UserCreate } from './mixed-advanced-example';

/** Checks if password inside MixedAdvanced_UserCreate is valid */
export class BodyPasswordPipe implements PipeTransform<MixedAdvanced_UserCreate, MixedAdvanced_UserCreate> {
  transform(value: MixedAdvanced_UserCreate, metadata: ArgumentMetadata): MixedAdvanced_UserCreate {
    const {password} = value;
    if (password.length < 8) {
      throw new NgxApiMimicException(
        400,
        \`Validation failed (password must contain at least 8 characters) for property: $\{metadata.data\}\`,
      );
    }
    if (!new RegExp(/[!@#$%^&*.,()\\\\/]/).test(password)) {
      throw new NgxApiMimicException(
        400,
        \`Validation failed (password must contain at least 1 special character) for property: $\{metadata.data\}\`,
      );
    }
    if (!new RegExp(/[A-Z]/).test(password)) {
      throw new NgxApiMimicException(
        400,
        \`Validation failed (password must contain at least 1 large character) for property: $\{metadata.data\}\`,
      );
    }
    return value;
  }
}`;

export const guardCode = `import { CanActivate, NgxApiMimicExecutionContext, NgxApiMimicException } from 'ngx-api-mimic';

export class MixedAdvanced_AuthGuard implements CanActivate {
  canActivate(context: NgxApiMimicExecutionContext): boolean {
    const request = context.getRequest();
    const authHeader = request.headers.get('Authorization');

    if (authHeader === 'Bearer test') {
      return true;
    }

    throw new NgxApiMimicException(401, 'Unauthorized: Invalid or missing token');
  }
}`;

export const classCode = `import { Controller, UseGuards, UsingSchema, Get, Query, ParseIntPipe, UrlParam, Post, Body, Put, Delete } from 'ngx-api-mimic';
import { MixedAdvanced_UserList, MixedAdvanced_UserCreate, BodyPasswordPipe, MixedAdvanced_AuthGuard, UserRoles } from './mixed-advanced-example';

@Controller('users')
@UseGuards(MixedAdvanced_AuthGuard)
@UsingSchema<MixedAdvanced_UserList>('users-advanced', {
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
          role: {
            type: 'enum',
            enum: [...UserRoles],
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
          createDate: {
            type: 'custom',
            customFn: (instructions) =>
              instructions.randomDate(new Date(2025, 0, 1), new Date(2026, 3, 6)),
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
  data!: MixedAdvanced_UserList;

  @Get('/list')
  listUsers(
    @Query('textFilter') textFilter = '',
    @Query('skip', ParseIntPipe) skip: number = 0,
    @Query('count', ParseIntPipe) count: number = 10,
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
  createUser(@Body(BodyPasswordPipe) userCreate: MixedAdvanced_UserCreate) {
    const newUser = {
      ...userCreate,
      id: Math.round(Math.random() * 999999).toString(36) + Date.now().toString(36),
      role: UserRoles[0],
      createDate: new Date(),
    };
    this.data = {
      items: [...this.data.items, newUser],
      totalCount: this.data.totalCount + 1,
    };
    return newUser;
  }

  @Put('/:id')
  updateUser(@UrlParam('id') id: string, @Body() userUpdate: Partial<MixedAdvanced_UserCreate>) {
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
}`;

export const routerCode = `import { ngxApiMimicRouterFactory, ngxApiMockInterceptorFactory } from 'ngx-api-mimic';
import { UsersController } from './mixed-advanced-example';

const router = ngxApiMimicRouterFactory([UsersController]);
router.usePrefix('mixed-advanced-example');
export const mixedAdvancedExampleInterceptor = ngxApiMockInterceptorFactory(router);`;

