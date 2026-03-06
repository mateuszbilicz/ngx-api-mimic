import {
  classCode,
  guardCode,
  interfacesCode,
  routerCode,
} from './examples-api-mock-advanced-data';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DocPageComponent } from '../../../../../../core/elements/doc-page/doc-page.component';
import { CodeViewerComponent } from '../../../../../../core/elements/code-viewer/code-viewer.component';
import { DocTabsComponent } from '../../../../../../core/elements/doc-tabs/doc-tabs.component';
import { ConsolePreviewComponent } from '../../../../../../core/elements/console-preview/console-preview/console-preview.component';
import { Panel } from 'primeng/panel';
import { Button } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Fluid } from 'primeng/fluid';
import { TooltipModule } from 'primeng/tooltip';
import {
  ApiMockAdvanced_Task,
  ApiMockAdvanced_TaskStatus,
} from '../../../../../../examples/api-mock-advanced-example';

@Component({
  selector: 'app-examples-api-mock-advanced-view',
  imports: [
    DocPageComponent,
    CodeViewerComponent,
    DocTabsComponent,
    ConsolePreviewComponent,
    Panel,
    Button,
    FormsModule,
    Select,
    InputText,
    TableModule,
    Fluid,
    TooltipModule,
  ],
  templateUrl: './examples-api-mock-advanced-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesApiMockAdvancedViewComponent {
  private http = inject(HttpClient);

  selectedToken = signal<string | null>('user-token');
  tokenOptions = [
    { label: 'No Token (Unauthorized)', value: null },
    { label: 'User Token (Standard User)', value: 'user-token' },
    { label: 'Admin Token (Administrator)', value: 'admin-token' },
  ];

  tasks = signal<ApiMockAdvanced_Task[]>([]);
  role = signal<string>('Unknown');
  loading = signal<boolean>(false);
  statuses = signal<ApiMockAdvanced_TaskStatus[]>([]);

  newTaskForm = signal<{ name: string; status: string }>({ name: '', status: '' });

  private getHeaders() {
    const headers: any = {};
    const token = this.selectedToken();
    if (token) headers['Authorization'] = token;
    return headers;
  }

  loadTasks() {
    this.loading.set(true);

    if (this.statuses().length === 0) {
      this.http
        .get<any[]>('/api-mock-advanced-example/tasks/statuses', { headers: this.getHeaders() })
        .pipe(catchError(() => of([])))
        .subscribe((res) => {
          if (Array.isArray(res)) this.statuses.set(res);
        });
    }

    this.http
      .get<{ items: ApiMockAdvanced_Task[]; role: string }>('/api-mock-advanced-example/tasks', {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((err) => of({ error: err.error?.message || err.message, status: err.status })),
      )
      .subscribe((res: any) => {
        this.loading.set(false);
        if (res.items) {
          this.tasks.set(res.items);
          this.role.set(res.role);
        } else {
          console.error('Error fetching tasks', res);
        }
      });
  }

  createTask() {
    const form = this.newTaskForm();
    if (!form.name || !form.status) return;

    this.loading.set(true);
    this.http
      .post('/api-mock-advanced-example/tasks', form, { headers: this.getHeaders() })
      .pipe(
        catchError((err) => of({ error: err.error?.message || err.message, status: err.status })),
      )
      .subscribe((res: any) => {
        this.loading.set(false);
        if (!res.error) {
          this.newTaskForm.set({ name: '', status: '' });
          this.loadTasks();
        } else {
          console.error('Failed to create task', res);
        }
      });
  }

  updateTask(id: string, name: string, status: string) {
    this.loading.set(true);
    this.http
      .put(
        `/api-mock-advanced-example/tasks/${id}`,
        { name, status },
        { headers: this.getHeaders() },
      )
      .pipe(
        catchError((err) => of({ error: err.error?.message || err.message, status: err.status })),
      )
      .subscribe((res: any) => {
        this.loading.set(false);
        if (!res.error) {
          this.loadTasks();
        } else {
          console.error('Failed to update task', res);
        }
      });
  }

  deleteTask(id: string) {
    this.loading.set(true);
    this.http
      .delete(`/api-mock-advanced-example/tasks/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((err) => of({ error: err.error?.message || err.message, status: err.status })),
      )
      .subscribe((res: any) => {
        this.loading.set(false);
        if (!res.error) {
          this.loadTasks();
        } else {
          console.error('Failed to delete task', res);
        }
      });
  }

  interfacesCode = interfacesCode;

  guardCode = guardCode;

  classCode = classCode;

  routerCode = routerCode;
}
