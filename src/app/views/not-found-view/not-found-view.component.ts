import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppTitleService } from '../../core/services/app-title/app-title.service';

@Component({
  selector: 'app-not-found-view',
  imports: [],
  templateUrl: './not-found-view.component.html',
  styleUrl: './not-found-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundViewComponent {
  protected readonly appTitleService = inject(AppTitleService);

  constructor() {
    this.appTitleService.setTitle('404 Not Found');
  }
}
