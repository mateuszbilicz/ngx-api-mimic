import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-examples-view',
  imports: [],
  templateUrl: './examples-view.component.html',
  styleUrl: './examples-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesViewComponent {}
