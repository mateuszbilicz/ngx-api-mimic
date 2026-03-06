import { JsonPipe } from '@angular/common';
import { classCode } from './examples-data-mock-advanced-data';
import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { DocPageComponent } from '../../../../../../core/elements/doc-page/doc-page.component';
import { CodeViewerComponent } from '../../../../../../core/elements/code-viewer/code-viewer.component';
import { DocTabsComponent } from '../../../../../../core/elements/doc-tabs/doc-tabs.component';
import { ConsolePreviewComponent } from '../../../../../../core/elements/console-preview/console-preview/console-preview.component';
import { Panel } from 'primeng/panel';
import { DataMockAdvancedCategoryService, DataMockAdvancedProductService } from '../../../../../../examples/data-mock-advanced-example';

@Component({
  selector: 'app-examples-data-mock-advanced-view',
  imports: [
        JsonPipe,
    DocPageComponent,
    CodeViewerComponent,
    DocTabsComponent,
    ConsolePreviewComponent,
    Panel,
  ],
  templateUrl: './examples-data-mock-advanced-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesDataMockAdvancedViewComponent {
  private catService = inject(DataMockAdvancedCategoryService);
  private prodService = inject(DataMockAdvancedProductService);

  categories = computed(() => this.catService.getCategories());
  products = computed(() => this.prodService.getProducts());

  classCode = classCode;
}
