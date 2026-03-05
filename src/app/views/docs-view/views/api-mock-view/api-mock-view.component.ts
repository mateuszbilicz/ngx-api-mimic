import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-api-mock-view',
  imports: [],
  templateUrl: './api-mock-view.component.html',
  styleUrl: './api-mock-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiMockViewComponent {}
