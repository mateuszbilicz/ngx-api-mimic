import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPageComponent } from '../../../../core/elements/doc-page/doc-page.component';
import { Tag } from 'primeng/tag';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-docs-default-view',
  imports: [DocPageComponent, Tag, RouterLink],
  templateUrl: './docs-default-view.component.html',
  styleUrl: './docs-default-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsDefaultViewComponent {}
