import { NamedRoutes } from './core/api/named-route';

export const routes: NamedRoutes = [
  {
    path: '',
    data: {
      name: 'Welcome',
      icon: 'pi pi-home',
    },
    loadComponent: () =>
      import('./views/welcome-view/welcome-view.component').then((v) => v.WelcomeViewComponent),
  },
  {
    path: 'docs',
    data: {
      name: 'Documentation',
      icon: 'pi pi-file',
    },
    loadComponent: () =>
      import('./views/docs-view/docs-view.component').then((v) => v.DocsViewComponent),
    loadChildren: () => import('./views/docs-view/docs-view.routes').then((v) => v.docsViewRoutes),
  },
  {
    path: 'credits',
    data: {
      name: 'Credits',
      icon: 'pi pi-heart',
    },
    loadComponent: () =>
      import('./views/credits-view/credits-view.component').then((v) => v.CreditsViewComponent),
  },
  {
    path: '**',
    data: {
      name: '404 Not Found',
      hideInNavigation: true,
    },
    loadComponent: () =>
      import('./views/not-found-view/not-found-view.component').then(
        (v) => v.NotFoundViewComponent,
      ),
  },
];
