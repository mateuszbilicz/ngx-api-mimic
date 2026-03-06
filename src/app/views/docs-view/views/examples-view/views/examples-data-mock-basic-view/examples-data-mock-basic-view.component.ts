import { JsonPipe } from '@angular/common';
import { classCode } from './examples-data-mock-basic-data';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DocPageComponent } from '../../../../../../core/elements/doc-page/doc-page.component';
import { CodeViewerComponent } from '../../../../../../core/elements/code-viewer/code-viewer.component';
import { DocTabsComponent } from '../../../../../../core/elements/doc-tabs/doc-tabs.component';
import { ConsolePreviewComponent } from '../../../../../../core/elements/console-preview/console-preview/console-preview.component';
import { Panel } from 'primeng/panel';
import { DataMockBasicExampleService } from '../../../../../../examples/data-mock-basic-example';

@Component({
  selector: 'app-examples-data-mock-basic-view',
  imports: [
    JsonPipe,
    DocPageComponent,
    CodeViewerComponent,
    DocTabsComponent,
    ConsolePreviewComponent,
    Panel,
  ],
  templateUrl: './examples-data-mock-basic-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesDataMockBasicViewComponent {
  private service = inject(DataMockBasicExampleService);

  list = computed(() => this.service.getItems());

  classCode = classCode;
}
