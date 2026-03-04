import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found-view',
  imports: [],
  templateUrl: './not-found-view.component.html',
  styleUrl: './not-found-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundViewComponent {}
