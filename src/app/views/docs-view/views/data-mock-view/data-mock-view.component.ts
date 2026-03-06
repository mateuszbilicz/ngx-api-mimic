import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { DocPageComponent } from '../../../../core/elements/doc-page/doc-page.component';
import { DescriptionTreeBranch } from '../../../../core/api/description-tree';
import { DescriptionTreeComponent } from '../../../../core/elements/description-tree/description-tree.component';

@Component({
  selector: 'app-data-mock-view',
  imports: [DocPageComponent, DescriptionTreeComponent],
  templateUrl: './data-mock-view.component.html',
  styleUrl: './data-mock-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMockViewComponent implements OnInit {
  classTree = signal<DescriptionTreeBranch>({ title: 'Loading...', description: 'Content will appear soon...', items: [] });
  typesAndInterfacesTree = signal<DescriptionTreeBranch>({ title: 'Loading...', description: 'Content will appear soon...', items: [] });

  ngOnInit() {
    import('./data-mock-class.tree').then(t => this.classTree.set(t.dataMockClassTree));
    import('./data-mock-types.tree').then(t => this.typesAndInterfacesTree.set(t.dataMockTypesTree));
  }
}
