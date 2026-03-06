import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DocPageComponent } from '../../../../../../core/elements/doc-page/doc-page.component';
import { CodeViewerComponent } from '../../../../../../core/elements/code-viewer/code-viewer.component';
import { DocTabsComponent } from '../../../../../../core/elements/doc-tabs/doc-tabs.component';
import { ConsolePreviewComponent } from '../../../../../../core/elements/console-preview/console-preview/console-preview.component';
import { Panel } from 'primeng/panel';
import { Button } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Fluid } from 'primeng/fluid';
import { TooltipModule } from 'primeng/tooltip';
import { ApiMockAdvanced_Task, ApiMockAdvanced_TaskStatus } from '../../../../../../examples/api-mock-advanced-example';

@Component({
  selector: 'app-examples-api-mock-advanced-view',
  imports: [
    DocPageComponent,
    CodeViewerComponent,
    DocTabsComponent,
    ConsolePreviewComponent,
    Panel,
    Button,
    JsonPipe,
    FormsModule,
    Select,
    InputText,
    TableModule,
    Fluid,
    TooltipModule
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
    { label: 'Admin Token (Administrator)', value: 'admin-token' }
  ];

  tasks = signal<ApiMockAdvanced_Task[]>([]);
  role = signal<string>('Unknown');
  loading = signal<boolean>(false);
  statuses = signal<ApiMockAdvanced_TaskStatus[]>([]);

  newTaskForm = signal<{ name: string, status: string }>({ name: '', status: '' });

  private getHeaders() {
    const headers: any = {};
    const token = this.selectedToken();
    if (token) headers['Authorization'] = token;
    return headers;
  }

  loadTasks() {
    this.loading.set(true);

    if (this.statuses().length === 0) {
      this.http.get<any[]>('/api-mock-advanced-example/tasks/statuses', { headers: this.getHeaders() })
        .pipe(catchError(() => of([])))
        .subscribe(res => {
          if (Array.isArray(res)) this.statuses.set(res);
        });
    }

    this.http.get<{ items: ApiMockAdvanced_Task[], role: string }>('/api-mock-advanced-example/tasks', { headers: this.getHeaders() })
      .pipe(catchError(err => of({ error: err.error?.message || err.message, status: err.status })))
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
    this.http.post('/api-mock-advanced-example/tasks', form, { headers: this.getHeaders() })
      .pipe(catchError(err => of({ error: err.error?.message || err.message, status: err.status })))
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
    this.http.put(`/api-mock-advanced-example/tasks/${id}`, { name, status }, { headers: this.getHeaders() })
      .pipe(catchError(err => of({ error: err.error?.message || err.message, status: err.status })))
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
    this.http.delete(`/api-mock-advanced-example/tasks/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(err => of({ error: err.error?.message || err.message, status: err.status })))
      .subscribe((res: any) => {
        this.loading.set(false);
        if (!res.error) {
          this.loadTasks();
        } else {
          console.error('Failed to delete task', res);
        }
      });
  }

  interfacesCode = `export enum ApiMockAdvanced_TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done'
}

export interface ApiMockAdvanced_Task {
    id: string;
    name: string;
    status: ApiMockAdvanced_TaskStatus;
}`;

  guardCode = `import { CanActivate, NgxApiMimicExecutionContext, NgxApiMimicException } from 'ngx-api-mimic';

export class ApiMockAdvanced_AuthGuard implements CanActivate {
    canActivate(context: NgxApiMimicExecutionContext): boolean {
        const req = context.getRequest();
        const token = req.headers.get('Authorization');
        if (!token) {
            throw new NgxApiMimicException(401, 'Unauthorized');
        }
        const instance: any = context.getClass();
        instance.userRole = token === 'admin-token' ? 'admin' : 'user';
        return true;
    }
}

export class ApiMockAdvanced_AdminGuard implements CanActivate {
    canActivate(context: NgxApiMimicExecutionContext): boolean {
        const instance: any = context.getClass();
        if (instance.userRole !== 'admin') {
            throw new NgxApiMimicException(403, 'Forbidden, admin only');
        }
        return true;
    }
}`;

  classCode = `import {
    Controller, Get, Post, Put, Delete, Body, UrlParam, UseGuards, NgxApiMimicException
} from 'ngx-api-mimic';
import { ApiMockAdvanced_Task, ApiMockAdvanced_TaskStatus, ApiMockAdvanced_AuthGuard, ApiMockAdvanced_AdminGuard } from './api-mock-advanced-example';

@Controller('tasks')
@UseGuards(ApiMockAdvanced_AuthGuard)
export class ApiMockAdvancedController {
    userRole: string = 'user';
    private tasks: ApiMockAdvanced_Task[] = [
        { id: Math.random().toString(36).substring(2, 9), name: 'Learn Angular', status: ApiMockAdvanced_TaskStatus.DONE },
        { id: Math.random().toString(36).substring(2, 9), name: 'Master rxJS', status: ApiMockAdvanced_TaskStatus.IN_PROGRESS },
        { id: Math.random().toString(36).substring(2, 9), name: 'Test ngx-api-mimic', status: ApiMockAdvanced_TaskStatus.TODO }
    ];

    @Get('/statuses')
    getStatuses() {
        return Object.values(ApiMockAdvanced_TaskStatus);
    }

    @Get('/')
    getTasks() {
        return {
            items: this.tasks,
            role: this.userRole
        };
    }

    @Post('/')
    createTask(@Body() body: any) {
        if (!body || !body.name || !body.status || !Object.values(ApiMockAdvanced_TaskStatus).includes(body.status)) {
            throw new NgxApiMimicException(400, 'Name and valid status are required!');
        }
        const newTask: ApiMockAdvanced_Task = {
            id: Math.random().toString(36).substring(2, 9),
            name: body.name,
            status: body.status
        };
        this.tasks.push(newTask);
        return newTask;
    }

    @Put('/:id')
    updateTask(@UrlParam('id') id: string, @Body() body: any) {
        const taskIdx = this.tasks.findIndex(t => t.id === id);
        if (taskIdx === -1) {
            throw new NgxApiMimicException(404, 'Task not found');
        }
        if (!body || !body.name || !body.status || !Object.values(ApiMockAdvanced_TaskStatus).includes(body.status)) {
            throw new NgxApiMimicException(400, 'Name and valid status are required to update!');
        }
        this.tasks[taskIdx] = { ...this.tasks[taskIdx], name: body.name, status: body.status };
        return this.tasks[taskIdx];
    }

    @Delete('/:id')
    @UseGuards(ApiMockAdvanced_AdminGuard)
    deleteTask(@UrlParam('id') id: string) {
        const taskIdx = this.tasks.findIndex(t => t.id === id);
        if (taskIdx === -1) {
            throw new NgxApiMimicException(404, 'Task not found');
        }
        const deleted = this.tasks.splice(taskIdx, 1);
        return deleted[0];
    }
}`;

  routerCode = `import { ngxApiMimicRouterFactory, ngxApiMockInterceptorFactory } from 'ngx-api-mimic';
import { ApiMockAdvancedController } from './api-mock-advanced-example';

const router = ngxApiMimicRouterFactory([ApiMockAdvancedController]);
router.usePrefix('api-mock-advanced-example');
export const apiMockAdvancedExampleInterceptor = ngxApiMockInterceptorFactory(router);`;
}
