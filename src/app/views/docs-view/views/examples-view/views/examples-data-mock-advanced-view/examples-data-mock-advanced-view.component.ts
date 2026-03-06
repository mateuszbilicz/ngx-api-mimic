import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { DocPageComponent } from '../../../../../../core/elements/doc-page/doc-page.component';
import { CodeViewerComponent } from '../../../../../../core/elements/code-viewer/code-viewer.component';
import { DocTabsComponent } from '../../../../../../core/elements/doc-tabs/doc-tabs.component';
import { ConsolePreviewComponent } from '../../../../../../core/elements/console-preview/console-preview/console-preview.component';
import { Panel } from 'primeng/panel';
import { DataMockAdvancedCategoryService, DataMockAdvancedProductService } from '../../../../../../examples/data-mock-advanced-example';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-examples-data-mock-advanced-view',
  imports: [
    DocPageComponent,
    CodeViewerComponent,
    DocTabsComponent,
    ConsolePreviewComponent,
    Panel,
    JsonPipe
  ],
  templateUrl: './examples-data-mock-advanced-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesDataMockAdvancedViewComponent {
  private catService = inject(DataMockAdvancedCategoryService);
  private prodService = inject(DataMockAdvancedProductService);

  categories = computed(() => this.catService.getCategories());
  products = computed(() => this.prodService.getProducts());

  classCode = `import { Injectable } from '@angular/core';
import { NgxApiMimicMockData } from 'ngx-api-mimic';

export interface DataMockAdvanced_Category {
  id: string;
  name: string;
}

export interface DataMockAdvanced_Product {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  inStock: boolean;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataMockAdvancedCategoryService extends NgxApiMimicMockData<DataMockAdvanced_Category[]> {
  constructor() {
    super('data-mock-advanced-categories', {
      type: 'array',
      itemCount: 5,
      item: {
         type: 'object',
         items: {
           id: { type: 'string', minLength: 6, maxLength: 10 },
           name: { type: 'firstName' } // Generates random first name
         }
      }
    });
  }

  getCategories() {
    return this.data;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataMockAdvancedProductService extends NgxApiMimicMockData<DataMockAdvanced_Product[]> {
  constructor(private categoryService: DataMockAdvancedCategoryService) {
    super('data-mock-advanced-products', {
      type: 'array',
      itemCount: 20,
      item: {
        type: 'object',
        items: {
           id: { type: 'string', minLength: 8, maxLength: 12 },
           categoryId: { 
             type: 'enum', 
             enum: categoryService.data.map(c => c.id) // Dynamic enum based on categories mock
           },
           title: { type: 'string', minLength: 10, maxLength: 20 },
           description: { type: 'string', minLength: 50, maxLength: 100 },
           price: { type: 'number', min: 5, max: 2000, round: true },
           inStock: { type: 'boolean' },
           code: {
             type: 'custom',
             customFn: (instructions) => {
                return instructions.randomString(3, 3).toUpperCase() + '-' + instructions.randomNumber(1000, 9999, true, 0).toString();
             }
           }
        }
      }
    });
  }

  getProducts() {
    return this.data;
  }

  createProduct(categoryId: string, title: string, price: number) {
    const newProduct: DataMockAdvanced_Product = {
      id: this._$generateRandomString(8, 12),
      categoryId,
      title,
      description: this._$generateRandomString(50, 100),
      price,
      inStock: this._$generateRandomBool(),
      code: this._$generateRandomString(3, 3).toUpperCase() + '-' + this._$generateRandomNumber(1000, 9999, true, 0).toString()
    };
    this.data = [...this.data, newProduct];
    return newProduct;
  }

  deleteProduct(id: string) {
    this.data = this.data.filter(p => p.id !== id);
  }
}`;
}
