import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MixedBasic_User,
  MixedBasic_UserCreate,
  MixedBasic_UserList,
} from '../../../examples/mixed-basic-example';
import { finalize, Observable, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MixedBasicExampleService {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly httpClient = inject(HttpClient);
  protected readonly BASE_PATH = '/mixed-basic-example';
  loadingList = signal<boolean>(false);
  errorList = signal<boolean>(false);

  getList(textFilter?: string, skip?: number, count?: number): Observable<MixedBasic_UserList> {
    this.errorList.set(false);
    this.loadingList.set(true);
    return this.httpClient
      .get<MixedBasic_UserList>(`${this.BASE_PATH}/users/list`, {
        params: {
          ...(textFilter ? { textFilter } : {}),
          ...(skip ? { skip } : {}),
          ...(count ? { count } : {}),
        },
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loadingList.set(false)),
        catchError((err) => {
          this.errorList.set(true);
          return throwError(() => err);
        }),
      );
  }

  getUser(id: string): Observable<MixedBasic_User> {
    return this.httpClient
      .get<MixedBasic_User>(`${this.BASE_PATH}/users/${id}`)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  createUser(createUser: MixedBasic_UserCreate): Observable<MixedBasic_User> {
    return this.httpClient
      .post<MixedBasic_User>(`${this.BASE_PATH}/users`, createUser)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  updateUser(id: string, userUpdate: Partial<MixedBasic_UserCreate>): Observable<MixedBasic_User> {
    return this.httpClient
      .put<MixedBasic_User>(`${this.BASE_PATH}/users/${id}`, userUpdate)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  deleteUser(id: string): Observable<{ ok: boolean }> {
    return this.httpClient
      .delete<{ ok: boolean }>(`${this.BASE_PATH}/users/${id}`)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
