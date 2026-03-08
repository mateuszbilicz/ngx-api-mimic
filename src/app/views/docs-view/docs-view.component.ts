import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
import { SearchInAppService } from '../../core/services/search-in-app/search-in-app.service';
import { AppSearchResult } from '../../core/services/search-in-app/search-in-app.interface';
import { ButtonModule } from 'primeng/button';
import { switchMap, tap, filter } from 'rxjs';

@Component({
  selector: 'app-docs-view',
  imports: [RouterOutlet, ButtonModule, RouterLink],
  templateUrl: './docs-view.component.html',
  styleUrl: './docs-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsViewComponent {
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchInAppService);

  searchQuery = signal('');
  loading = signal(false);
  results = signal<AppSearchResult[]>([]);

  constructor() {
    this.route.queryParams
      .pipe(
        tap((params) => {
          const q = params['q'] || '';
          this.searchQuery.set(q);
          if (q.trim().length >= 2) {
            this.loading.set(true);
          } else {
            this.results.set([]);
            this.loading.set(false);
          }
        }),
        filter((params) => (params['q'] || '').trim().length >= 2),
        switchMap((params) => this.searchService.search(params['q']))
      )
      .subscribe((res) => {
        this.results.set(res);
        this.loading.set(false);
      });
  }
}
