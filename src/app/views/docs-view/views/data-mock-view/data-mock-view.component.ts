import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';

import { DocPageComponent } from '../../../../core/elements/doc-page/doc-page.component';
import { DescriptionTreeBranch } from '../../../../core/api/description-tree';
import { DescriptionTreeComponent } from '../../../../core/elements/description-tree/description-tree.component';
import { DescriptionTreeSearchService } from '../../../../core/services/description-tree-search/description-tree-search.service';

import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-data-mock-view',
  imports: [DocPageComponent, DescriptionTreeComponent, IconField, InputIcon, InputText],
  templateUrl: './data-mock-view.component.html',
  styleUrl: './data-mock-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMockViewComponent implements OnInit {
  private searchService = inject(DescriptionTreeSearchService);

  searchQuery = signal<string>('');
  forceExpand = signal<boolean>(false);

  classTree = signal<DescriptionTreeBranch>({
    title: 'Loading...',
    description: 'Content will appear soon...',
    items: [],
  });
  typesAndInterfacesTree = signal<DescriptionTreeBranch>({
    title: 'Loading...',
    description: 'Content will appear soon...',
    items: [],
  });

  private originalClassTree: DescriptionTreeBranch | null = null;
  private originalTypesTree: DescriptionTreeBranch | null = null;

  constructor() {
    toObservable(this.searchQuery)
      .pipe(debounceTime(500))
      .subscribe((query) => {
        this.forceExpand.set(!!query);
        if (this.originalClassTree)
          this.classTree.set(this.searchService.searchInTree(query, this.originalClassTree));
        if (this.originalTypesTree)
          this.typesAndInterfacesTree.set(
            this.searchService.searchInTree(query, this.originalTypesTree),
          );
      });
  }

  ngOnInit() {
    import('./data-mock-class.tree').then((t) => {
      this.originalClassTree = t.dataMockClassTree;
      this.classTree.set(this.originalClassTree);
    });
    import('./data-mock-types.tree').then((t) => {
      this.originalTypesTree = t.dataMockTypesTree;
      this.typesAndInterfacesTree.set(this.originalTypesTree);
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }
}
