import { JsonPipe } from '@angular/common';
import { classCode, routerCode } from './examples-api-mock-basic-data';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DocPageComponent } from '../../../../../../core/elements/doc-page/doc-page.component';
import { CodeViewerComponent } from '../../../../../../core/elements/code-viewer/code-viewer.component';
import { DocTabsComponent } from '../../../../../../core/elements/doc-tabs/doc-tabs.component';
import { ConsolePreviewComponent } from '../../../../../../core/elements/console-preview/console-preview/console-preview.component';
import { Panel } from 'primeng/panel';
import { Button } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-examples-api-mock-basic-view',
  imports: [
    JsonPipe,
    DocPageComponent,
    CodeViewerComponent,
    DocTabsComponent,
    ConsolePreviewComponent,
    Panel,
    Button,
  ],
  templateUrl: './examples-api-mock-basic-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesApiMockBasicViewComponent {
  private http = inject(HttpClient);

  pingResult = signal<any>(null);
  countResult = signal<any>(null);

  ping() {
    this.http
      .get('/api-mock-basic-example/basic-api/ping')
      .subscribe((res) => this.pingResult.set(res));
  }

  getCount() {
    this.http
      .get('/api-mock-basic-example/basic-api/count')
      .subscribe((res) => this.countResult.set(res));
  }

  incrementCount() {
    this.http
      .post('/api-mock-basic-example/basic-api/increment', {})
      .subscribe((res) => this.countResult.set(res));
  }

  classCode = classCode;

  routerCode = routerCode;
}
