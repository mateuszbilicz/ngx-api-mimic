import { ChangeDetectionStrategy, Component, effect, inject, model, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchInAppService } from '../../services/search-in-app/search-in-app.service';
import { AppSearchResult } from '../../services/search-in-app/search-in-app.interface';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-dialog',
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchDialogComponent {
  private searchService = inject(SearchInAppService);
  private router = inject(Router);

  visible = model(false);

  searchText = signal('');
  loading = signal(false);
  results = signal<AppSearchResult[]>([]);
  hasSearched = signal(false);

  private searchRequest$ = new Subject<string>();
  private cancelSearch$ = new Subject<void>();

  constructor() {
    this.searchRequest$
      .pipe(
        takeUntilDestroyed(),
        tap(() => {
          this.loading.set(true);
          this.hasSearched.set(true);
        }),
        switchMap((query) => this.searchService.search(query).pipe(takeUntil(this.cancelSearch$))),
      )
      .subscribe((res) => {
        this.results.set(res);
        this.loading.set(false);
      });

    effect(() => {
      if (!this.visible()) {
        this.cancelSearch();
      }
    });
  }

  triggerSearch() {
    if (this.searchText().trim().length >= 2) {
      this.cancelSearch$.next(); // cancel previous if any
      this.searchRequest$.next(this.searchText());
    } else {
      this.results.set([]);
      this.hasSearched.set(false);
    }
  }

  onInputTextChange() {
    this.loading.set(false);
    this.cancelSearch$.next();
  }

  cancelSearch() {
    this.cancelSearch$.next();
    this.results.set([]);
    this.searchText.set('');
    this.hasSearched.set(false);
    this.loading.set(false);
  }

  goToResult(link: string[]) {
    this.visible.set(false);
    this.router.navigate(link);
  }
}
