import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-examples-view',
  imports: [RouterOutlet],
  templateUrl: './examples-view.component.html',
  styleUrl: './examples-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesViewComponent {}
