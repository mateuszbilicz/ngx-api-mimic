import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { DescriptionTreeComponent } from '../../../../core/elements/description-tree/description-tree.component';
import { DocPageComponent } from '../../../../core/elements/doc-page/doc-page.component';
import { DescriptionTreeBranch } from '../../../../core/api/description-tree';

@Component({
  selector: 'app-api-mock-view',
  imports: [DescriptionTreeComponent, DocPageComponent],
  templateUrl: './api-mock-view.component.html',
  styleUrl: './api-mock-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiMockViewComponent implements OnInit {
  classTree = signal<DescriptionTreeBranch>({ title: 'Loading...', description: 'Content will appear soon...', items: [] });
  decoratorsTree = signal<DescriptionTreeBranch>({ title: 'Loading...', description: 'Content will appear soon...', items: [] });
  pipesTree = signal<DescriptionTreeBranch>({ title: 'Loading...', description: 'Content will appear soon...', items: [] });
  typesAndInterfacesTree = signal<DescriptionTreeBranch>({ title: 'Loading...', description: 'Content will appear soon...', items: [] });

  ngOnInit() {
    import('./api-mock-class.tree').then(t => this.classTree.set(t.apiMockClassTree));
    import('./api-mock-decorators.tree').then(t => this.decoratorsTree.set(t.apiMockDecoratorsTree));
    import('./api-mock-pipes.tree').then(t => this.pipesTree.set(t.apiMockPipesTree));
    import('./api-mock-types.tree').then(t => this.typesAndInterfacesTree.set(t.apiMockTypesTree));
  }
}
