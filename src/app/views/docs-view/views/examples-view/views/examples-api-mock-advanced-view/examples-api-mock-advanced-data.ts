export const interfacesCode = `export enum ApiMockAdvanced_TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done'
}

export interface ApiMockAdvanced_Task {
    id: string;
    name: string;
    status: ApiMockAdvanced_TaskStatus;
}`;

export const guardCode = `import { CanActivate, NgxApiMimicExecutionContext, NgxApiMimicException } from 'ngx-api-mimic';

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

export const classCode = `import {
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

export const routerCode = `import { ngxApiMimicRouterFactory, ngxApiMockInterceptorFactory } from 'ngx-api-mimic';
import { ApiMockAdvancedController } from './api-mock-advanced-example';

const router = ngxApiMimicRouterFactory([ApiMockAdvancedController]);
router.usePrefix('api-mock-advanced-example');
export const apiMockAdvancedExampleInterceptor = ngxApiMockInterceptorFactory(router);`;
