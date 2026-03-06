import { classCode, interfacesCode, routerCode } from './examples-mixed-basic-data';
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
    FormField,
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

  interfacesCode = interfacesCode;

  classCode = classCode;

  routerCode = routerCode;
}
