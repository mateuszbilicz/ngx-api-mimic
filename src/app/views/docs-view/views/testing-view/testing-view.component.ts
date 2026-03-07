import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DocPageComponent } from '../../../../core/elements/doc-page/doc-page.component';
import { CodeViewerComponent } from '../../../../core/elements/code-viewer/code-viewer.component';
import { AppTitleService } from '../../../../core/services/app-title/app-title.service';

@Component({
  selector: 'app-testing-view',
  imports: [DocPageComponent, CodeViewerComponent],
  templateUrl: './testing-view.component.html',
  styleUrl: './testing-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingViewComponent implements OnInit {
  protected readonly appTitleService = inject(AppTitleService);

  readonly dataMockCode = signal('');
  readonly apiMockCode = signal('');

  ngOnInit() {
    this.appTitleService.setTitle('Testing');
    import('./testing-view-data').then(d => {
      this.dataMockCode.set(d.dataMockCode);
      this.apiMockCode.set(d.apiMockCode);
    });
  }
}
