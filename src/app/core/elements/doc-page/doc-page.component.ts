import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { Panel } from 'primeng/panel';
import { AppTitleService } from '../../services/app-title/app-title.service';

@Component({
  selector: 'app-doc-page',
  imports: [Panel],
  templateUrl: './doc-page.component.html',
  styleUrl: './doc-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPageComponent {
  protected readonly appTitleService = inject(AppTitleService);
  name = input.required<string>();

  constructor() {
    effect(() => {
      this.appTitleService.setTitle(this.name());
    });
  }
}
