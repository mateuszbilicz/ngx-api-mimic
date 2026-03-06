import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbNavigationService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  breadcrumbItems = signal<MenuItem[]>([]);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: MenuItem[] = [];
        this.addBreadcrumb(root, [], breadcrumbs);
        this.breadcrumbItems.set(breadcrumbs);
      });
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: MenuItem[],
  ) {
    const routeUrl = parentUrl.concat(route.url.map((segment) => segment.path));
    const name = route.data?.['name'];

    if (name && !route.data?.['hideInNavigation']) {
      breadcrumbs.push({
        label: name,
        routerLink: '/' + routeUrl.join('/'),
      });
    }

    if (route.firstChild) {
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }
}
