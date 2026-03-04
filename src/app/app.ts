import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly httpClient = inject(HttpClient);

  constructor() {
    // These are just for quick testing, they will disappear as soon as I finish upgrading library...
    this.httpClient
      .get('/users/list', {
        params: {
          textFilter: 'And',
          skip: 0,
          count: 4
        },
        headers: {
          'Authorization': 'Bearer test'
        }
      })
      .pipe(takeUntilDestroyed())
      .subscribe((usersList) => {
        console.log('GET /users/list', usersList);
      });
    /*this.httpClient
      .get('/users/EDm1DnooXCLbkCipuh16ii42x')
      .pipe(takeUntilDestroyed())
      .subscribe((userById) => {
        console.log('GET /users/:id', userById);
      });
    this.httpClient
      .post('/users', {
        firstName: 'Tester',
        lastName: '01',
        email: 'tester01@test.com',
        age: 30,
        password: 'P@$$w0rD',
      })
      .pipe(
        takeUntilDestroyed(),
        tap((newUser) => {
          console.log('POST /users', newUser);
        }),
        switchMap((newUser) =>
          this.httpClient.put('/users/' + (newUser as any).id, {
            firstName: 'Tester',
            lastName: '02',
            email: 'tester02@test.com',
            age: 30,
            password: 'P@$$w0rD',
          }),
        ),
        tap((updatedUser) => {
          console.log('PUT /users/:id', updatedUser);
        }),
        switchMap((updatedUser) => this.httpClient.delete('/users/' + (updatedUser as any).id)),
        tap((deletedResponse) => {
          console.log('DELETE /users/:id', deletedResponse);
        }),
      )
      .subscribe();*/
  }
}
