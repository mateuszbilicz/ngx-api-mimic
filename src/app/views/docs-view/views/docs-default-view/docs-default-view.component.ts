import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-docs-default-view',
  imports: [],
  templateUrl: './docs-default-view.component.html',
  styleUrl: './docs-default-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsDefaultViewComponent {}
