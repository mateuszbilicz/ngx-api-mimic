import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ExampleRouteProperties } from '../../../../../../core/api/example-routes';
import { examplesViewRoutes } from '../../examples-view.routes';
import { DocPageComponent } from '../../../../../../core/elements/doc-page/doc-page.component';
import { RouterLink } from '@angular/router';
import { Tag } from 'primeng/tag';

interface ExampleRoute extends ExampleRouteProperties {
  path: string[];
}

@Component({
  selector: 'app-examples-default-view',
  imports: [DocPageComponent, RouterLink, Tag],
  templateUrl: './examples-default-view.component.html',
  styleUrl: './examples-default-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesDefaultViewComponent {
  examples = signal<ExampleRoute[]>([]);

  constructor() {
    this.examples.set(
      examplesViewRoutes
        .filter((route) => !route.data.hideInNavigation)
        .map((route) => ({
          ...route.data.properties!,
          path: ['/docs/examples', route.path!],
        })),
    );
  }
}
