import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs-view',
  imports: [RouterOutlet],
  templateUrl: './docs-view.component.html',
  styleUrl: './docs-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsViewComponent {}
