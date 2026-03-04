import { NamedRoutes } from './core/api/named-route';

export const routes: NamedRoutes = [
  {
    path: '',
    data: {
      name: 'Welcome',
    },
    loadComponent: () =>
      import('./views/welcome-view/welcome-view.component').then((v) => v.WelcomeViewComponent),
  },
  {
    path: 'docs',
    data: {
      name: 'Documentation',
    },
    loadComponent: () =>
      import('./views/docs-view/docs-view.component').then((v) => v.DocsViewComponent),
    loadChildren: () => import('./views/docs-view/docs-view.routes').then((v) => v.docsViewRoutes),
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
