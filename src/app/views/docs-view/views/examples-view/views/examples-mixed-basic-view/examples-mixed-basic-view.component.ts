import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  model,
  signal,
} from '@angular/core';
import { DocPageComponent } from '../../../../../../core/elements/doc-page/doc-page.component';
import { CodeViewerComponent } from '../../../../../../core/elements/code-viewer/code-viewer.component';
import { DocTabsComponent } from '../../../../../../core/elements/doc-tabs/doc-tabs.component';
import { ConsolePreviewComponent } from '../../../../../../core/elements/console-preview/console-preview/console-preview.component';
import { Panel } from 'primeng/panel';
import { MixedBasicExampleService } from '../../../../../../core/services/examples/mixed-basic-example.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, startWith, Subject, switchMap, tap } from 'rxjs';
import {
  MixedBasic_User,
  MixedBasic_UserCreate,
} from '../../../../../../examples/mixed-basic-example';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-examples-mixed-basic-view',
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
    FormField
  ],
  templateUrl: './examples-mixed-basic-view.component.html',
  styleUrl: './examples-mixed-basic-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MixedBasicExampleService],
})
export class ExamplesMixedBasicViewComponent {
  protected readonly mixedBasicExampleService = inject(MixedBasicExampleService);
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
  usersLoading = linkedSignal(this.mixedBasicExampleService.loadingList);

  constructor() {
    combineLatest({
      filter: toObservable(this.filterText).pipe(debounceTime(250)),
      range: toObservable(this.dataRange),
      trigger: this.updateList$.pipe(startWith(null)),
    })
      .pipe(
        takeUntilDestroyed(),
        switchMap(({ filter, range }) =>
          this.mixedBasicExampleService.getList(filter, range.skip, range.count),
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
    this.mixedBasicExampleService
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
    this.mixedBasicExampleService.deleteUser(id).subscribe(() => this.updateList$.next());
  }

  updateUser(userId: any, field: string | undefined, data: string) {
    if (!userId || !field) return;
    this.mixedBasicExampleService
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

  interfacesCode = `export interface MixedBasic_UserCreate {
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
}`;

  classCode = `@Controller('users')
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
    @Query('skip', ParseIntPipe) skip: number = 0,
    @Query('count', ParseIntPipe) count: number = 10,
  ) {
    console.log('LIST USERS');
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
}`;

  routerCode = `const router = ngxApiMimicRouterFactory([UsersController]);
router.usePrefix('mixed-basic-example');
export const mixedBasicExampleInterceptor = ngxApiMockInterceptorFactory(router);`;
}
