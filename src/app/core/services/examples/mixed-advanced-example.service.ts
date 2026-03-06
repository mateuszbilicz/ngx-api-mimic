import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class MixedAdvancedExampleService {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly httpClient = inject(HttpClient);
  protected readonly BASE_PATH = '/mixed-advanced-example';
  loadingList = signal<boolean>(false);
  errorList = signal<boolean>(false);
  token = signal<string>('test');
  private headers = computed(() => ({
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token()}`,
    }),
  }));

  getList(textFilter?: string, skip?: number, count?: number): Observable<MixedBasic_UserList> {
    this.errorList.set(false);
    this.loadingList.set(true);
    return this.httpClient
      .get<MixedBasic_UserList>(
        `${this.BASE_PATH}/users/list?textFilter=${encodeURIComponent(
          textFilter ?? '',
        )}&skip=${skip}&count=${count}`,
        this.headers(),
      )
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
      .get<MixedBasic_User>(`${this.BASE_PATH}/users/${id}`, this.headers())
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  createUser(createUser: MixedBasic_UserCreate): Observable<MixedBasic_User> {
    return this.httpClient
      .post<MixedBasic_User>(`${this.BASE_PATH}/users`, createUser, this.headers())
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  updateUser(id: string, userUpdate: Partial<MixedBasic_UserCreate>): Observable<MixedBasic_User> {
    return this.httpClient
      .put<MixedBasic_User>(`${this.BASE_PATH}/users/${id}`, userUpdate, this.headers())
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  deleteUser(id: string): Observable<{ ok: boolean }> {
    return this.httpClient
      .delete<{ ok: boolean }>(`${this.BASE_PATH}/users/${id}`, this.headers())
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
