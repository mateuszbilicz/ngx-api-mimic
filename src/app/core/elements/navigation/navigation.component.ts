import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  DestroyRef,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, from, map, catchError, EMPTY, mergeMap } from 'rxjs';
import { PanelMenu } from 'primeng/panelmenu';
import { Drawer } from 'primeng/drawer';
import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { NamedRoutes } from '../../api/named-route';
import { NavigationEntry } from '../../api/navigation-entry';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [PanelMenu, Drawer, Button, Menubar],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private menuComponent = viewChild<Menubar>('menu');

  drawerVisible = signal<boolean>(false);
  navigationEntries = signal<NavigationEntry[]>([]);
  private expandSubject = new Subject<NavigationEntry>();

  constructor() {
    this.initLoadingPipeline();
  }

  ngOnInit() {
    const rootRoutes = this.router.config as NamedRoutes;
    this.navigationEntries.set(this.mapNavigationEntries(rootRoutes));
  }

  private initLoadingPipeline() {
    this.expandSubject
      .pipe(
        mergeMap((entry) => {
          if (!entry.loadChildren || entry.childrenLoaded || entry.loading) return EMPTY;
          entry.loading = true;
          this.refreshSignal();

          return from((entry.loadChildren as any)()).pipe(
            map((result: any) => {
              const childRoutes = Array.isArray(result)
                ? result
                : result.routes || Object.values(result)[0];
              return { oldEntry: entry, childRoutes: childRoutes as NamedRoutes };
            }),
            catchError(() => {
              entry.loading = false;
              this.refreshSignal();
              return EMPTY;
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ oldEntry, childRoutes }) => {
        const currentEntries = this.navigationEntries();
        const updatedEntry = this.findEntryByPath(currentEntries, oldEntry.path);

        if (updatedEntry) {
          updatedEntry.items = this.mapNavigationEntries(childRoutes, updatedEntry.path);
          updatedEntry.childrenLoaded = true;
          updatedEntry.loading = false;
          updatedEntry.expanded = true;

          this.refreshSignal();

          setTimeout(() => {
            const menu = this.menuComponent() as any;
            if (menu) {
              const reloadedEntry = this.findEntryByPath(
                this.navigationEntries(),
                updatedEntry.path,
              );
              if (reloadedEntry) {
                menu.activeItem = reloadedEntry;
                menu.cd.markForCheck();
              }
            }
          }, 50);
        }
      });
  }

  onEntryClick(entry: NavigationEntry, ev: MouseEvent) {
    this.router.navigate(entry.path);

    if (entry.hasChildren) {
      ev.preventDefault();
      ev.stopPropagation();

      if (entry.loadChildren && !entry.childrenLoaded) {
        this.expandSubject.next(entry);
      } else {
        entry.expanded = !entry.expanded;
        this.refreshSignal();
      }
    } else {
      this.drawerVisible.set(false);
      const menu = this.menuComponent() as any;
      if (menu) {
        menu.activeItem = null;
        menu.cd.markForCheck();
      }
    }
  }

  private mapNavigationEntries(routes: NamedRoutes, parentPath: string[] = []): NavigationEntry[] {
    return routes
      .filter(
        (route) => route.data?.name && !route.data.hideInNavigation && !route.path?.includes(':'),
      )
      .map((route) => {
        let fullPath: string[];
        if (route.path === '') {
          fullPath = parentPath.length === 0 ? ['/'] : [...parentPath];
        } else {
          fullPath = [...parentPath, route.path!.replace(/^\//, '')];
        }

        const hasChildren = !!(route.loadChildren || (route.children && route.children.length > 0));

        return {
          id: `nav-${fullPath.join('-')}`,
          label: route.data.name,
          icon: route.data.icon,
          path: fullPath,
          hasChildren: hasChildren,
          childrenLoaded: !!route.children,
          loadChildren: route.loadChildren,
          items: route.children
            ? this.mapNavigationEntries(route.children as NamedRoutes, fullPath)
            : undefined,
          loading: false,
          expanded: false,
        };
      });
  }

  private findEntryByPath(entries: NavigationEntry[], path: string[]): NavigationEntry | undefined {
    const pathStr = path.join('/');
    for (const e of entries) {
      if (e.path.join('/') === pathStr) return e;
      if (e.items) {
        const found = this.findEntryByPath(e.items, path);
        if (found) return found;
      }
    }
    return undefined;
  }

  private refreshSignal() {
    this.navigationEntries.update((val) => [...val]);
  }
}
