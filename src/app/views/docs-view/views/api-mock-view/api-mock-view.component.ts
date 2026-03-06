import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';

import { DescriptionTreeComponent } from '../../../../core/elements/description-tree/description-tree.component';
import { DocPageComponent } from '../../../../core/elements/doc-page/doc-page.component';
import { DescriptionTreeBranch } from '../../../../core/api/description-tree';
import { DescriptionTreeSearchService } from '../../../../core/services/description-tree-search/description-tree-search.service';

import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-api-mock-view',
  imports: [DescriptionTreeComponent, DocPageComponent, IconField, InputIcon, InputText],
  templateUrl: './api-mock-view.component.html',
  styleUrl: './api-mock-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiMockViewComponent implements OnInit {
  private searchService = inject(DescriptionTreeSearchService);

  searchQuery = signal<string>('');
  forceExpand = signal<boolean>(false);

  classTree = signal<DescriptionTreeBranch>({
    title: 'Loading...',
    description: 'Content will appear soon...',
    items: [],
  });
  decoratorsTree = signal<DescriptionTreeBranch>({
    title: 'Loading...',
    description: 'Content will appear soon...',
    items: [],
  });
  pipesTree = signal<DescriptionTreeBranch>({
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
  private originalDecoratorsTree: DescriptionTreeBranch | null = null;
  private originalPipesTree: DescriptionTreeBranch | null = null;
  private originalTypesTree: DescriptionTreeBranch | null = null;

  constructor() {
    toObservable(this.searchQuery)
      .pipe(debounceTime(500))
      .subscribe((query) => {
        this.forceExpand.set(!!query);
        if (this.originalClassTree)
          this.classTree.set(this.searchService.searchInTree(query, this.originalClassTree));
        if (this.originalDecoratorsTree)
          this.decoratorsTree.set(
            this.searchService.searchInTree(query, this.originalDecoratorsTree),
          );
        if (this.originalPipesTree)
          this.pipesTree.set(this.searchService.searchInTree(query, this.originalPipesTree));
        if (this.originalTypesTree)
          this.typesAndInterfacesTree.set(
            this.searchService.searchInTree(query, this.originalTypesTree),
          );
      });
  }

  ngOnInit() {
    import('./api-mock-class.tree').then((t) => {
      this.originalClassTree = t.apiMockClassTree;
      this.classTree.set(this.originalClassTree);
    });
    import('./api-mock-decorators.tree').then((t) => {
      this.originalDecoratorsTree = t.apiMockDecoratorsTree;
      this.decoratorsTree.set(this.originalDecoratorsTree);
    });
    import('./api-mock-pipes.tree').then((t) => {
      this.originalPipesTree = t.apiMockPipesTree;
      this.pipesTree.set(this.originalPipesTree);
    });
    import('./api-mock-types.tree').then((t) => {
      this.originalTypesTree = t.apiMockTypesTree;
      this.typesAndInterfacesTree.set(this.originalTypesTree);
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }
}
