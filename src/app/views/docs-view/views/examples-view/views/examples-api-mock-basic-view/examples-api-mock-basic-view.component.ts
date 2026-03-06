import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DocPageComponent } from '../../../../../../core/elements/doc-page/doc-page.component';
import { CodeViewerComponent } from '../../../../../../core/elements/code-viewer/code-viewer.component';
import { DocTabsComponent } from '../../../../../../core/elements/doc-tabs/doc-tabs.component';
import { ConsolePreviewComponent } from '../../../../../../core/elements/console-preview/console-preview/console-preview.component';
import { Panel } from 'primeng/panel';
import { Button } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-examples-api-mock-basic-view',
  imports: [
    DocPageComponent,
    CodeViewerComponent,
    DocTabsComponent,
    ConsolePreviewComponent,
    Panel,
    Button,
    JsonPipe
  ],
  templateUrl: './examples-api-mock-basic-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesApiMockBasicViewComponent {
  private http = inject(HttpClient);

  pingResult = signal<any>(null);
  countResult = signal<any>(null);

  ping() {
    this.http.get('/api-mock-basic-example/basic-api/ping')
      .subscribe(res => this.pingResult.set(res));
  }

  getCount() {
    this.http.get('/api-mock-basic-example/basic-api/count')
      .subscribe(res => this.countResult.set(res));
  }

  incrementCount() {
    this.http.post('/api-mock-basic-example/basic-api/increment', {})
      .subscribe(res => this.countResult.set(res));
  }

  classCode = `import { Controller, Get, Post } from 'ngx-api-mimic';

@Controller('basic-api')
export class ApiMockBasicController {
  private count = 0;

  @Get('/ping')
  ping() {
    return { message: 'Pong!' };
  }

  @Get('/count')
  getCount() {
    return { count: this.count };
  }

  @Post('/increment')
  increment() {
    this.count++;
    return { count: this.count };
  }
}`;

  routerCode = `import { ngxApiMimicRouterFactory, ngxApiMockInterceptorFactory } from 'ngx-api-mimic';
import { ApiMockBasicController } from './api-mock-basic-example';

const router = ngxApiMimicRouterFactory([ApiMockBasicController]);
router.usePrefix('api-mock-basic-example');
export const apiMockBasicExampleInterceptor = ngxApiMockInterceptorFactory(router);`;
}
