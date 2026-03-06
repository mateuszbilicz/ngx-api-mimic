import { ChangeDetectionStrategy, Component, inject, linkedSignal, model, signal } from '@angular/core';
import {Button} from "primeng/button";
import {CodeViewerComponent} from "../../../../../../core/elements/code-viewer/code-viewer.component";
import { ConsolePreviewComponent } from '../../../../../../core/elements/console-preview/console-preview/console-preview.component';
import {DocPageComponent} from "../../../../../../core/elements/doc-page/doc-page.component";
import {DocTabsComponent} from "../../../../../../core/elements/doc-tabs/doc-tabs.component";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {Panel} from "primeng/panel";
import {TableModule} from "primeng/table";
import { MixedBasic_User, MixedBasic_UserCreate } from '../../../../../../examples/mixed-basic-example';
import { form, FormField, required } from '@angular/forms/signals';
import { combineLatest, debounceTime, startWith, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MixedAdvancedExampleService } from '../../../../../../core/services/examples/mixed-advanced-example.service';
import { BodyPasswordPipe } from '../../../../../../examples/mixed-advanced-example';

@Component({
  selector: 'app-examples-mixed-advanced-view',
  imports: [
    DocPageComponent,
    CodeViewerComponent,
    DocTabsComponent,
    ConsolePreviewComponent,
    Panel,
    TableModule,
    Button,
    InputText,
    FormsModule,
    FormField,
  ],
  templateUrl: './examples-mixed-advanced-view.component.html',
  styleUrl: './examples-mixed-advanced-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MixedAdvancedExampleService],
})
export class ExamplesMixedAdvancedViewComponent {
  protected readonly mixedAdvancedExampleService = inject(MixedAdvancedExampleService);
  newUser = model<MixedBasic_UserCreate>({
    firstName: '',
    lastName: '',
    age: 20,
    email: '',
    password: '',
  });
  newUserForm = form(this.newUser, (schema) => {
    required(schema.firstName);
    required(schema.lastName);
    required(schema.age);
    required(schema.email);
    required(schema.password);
  });
  updateList$ = new Subject<void>();
  filterText = model<string>('');
  dataRange = model<{ skip: number; count: number }>({ skip: 0, count: 10 });
  usersList = signal<MixedBasic_User[]>([]);
  usersCount = signal<number>(0);
  usersLoading = linkedSignal(this.mixedAdvancedExampleService.loadingList);

  constructor() {
    combineLatest({
      filter: toObservable(this.filterText).pipe(debounceTime(250)),
      range: toObservable(this.dataRange),
      trigger: this.updateList$.pipe(startWith(null)),
    })
      .pipe(
        takeUntilDestroyed(),
        switchMap(({ filter, range }) =>
          this.mixedAdvancedExampleService.getList(filter, range.skip, range.count),
        ),
      )
      .subscribe((usersListRes) => {
        this.usersList.set(usersListRes.items);
        this.usersCount.set(usersListRes.totalCount);
      });
  }

  createUser() {
    if (this.newUserForm().invalid()) return;
    const userCreate = this.newUser();
    this.mixedAdvancedExampleService
      .createUser(userCreate)
      .pipe(
        tap(() =>
          this.newUserForm().reset({
            firstName: '',
            lastName: '',
            age: 20,
            email: '',
            password: '',
          }),
        ),
      )
      .subscribe(() => this.updateList$.next());
  }

  deleteUser(id: string) {
    this.mixedAdvancedExampleService.deleteUser(id).subscribe(() => this.updateList$.next());
  }

  updateUser(userId: any, field: string | undefined, data: string) {
    if (!userId || !field) return;
    this.mixedAdvancedExampleService
      .updateUser(userId, {
        [field]: data,
      })
      .subscribe();
  }

  setSkip(skip: number) {
    this.dataRange.update((prev) => ({
      ...prev,
      skip,
    }));
  }

  interfacesCode = `interface MixedAdvanced_UserCreate {
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

  pipeCode = `/** Checks if password inside MixedAdvanced_UserCreate is valid */
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

  guardCode = `class MixedAdvanced_AuthGuard implements CanActivate {
  canActivate(context: NgxApiMimicExecutionContext): boolean {
    const request = context.getRequest();
    const authHeader = request.headers.get('Authorization');

    if (authHeader === 'Bearer test') {
      return true;
    }

    throw new NgxApiMimicException(401, 'Unauthorized: Invalid or missing token');
  }
}`;

  classCode = `@Controller('users')
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

  routerCode = `const router = ngxApiMimicRouterFactory([UsersController]);
router.usePrefix('mixed-advanced-example');
export const mixedAdvancedExampleInterceptor = ngxApiMockInterceptorFactory(router);`;
}
