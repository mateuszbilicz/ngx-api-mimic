import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-data-mock-view',
  imports: [],
  templateUrl: './data-mock-view.component.html',
  styleUrl: './data-mock-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMockViewComponent {}
