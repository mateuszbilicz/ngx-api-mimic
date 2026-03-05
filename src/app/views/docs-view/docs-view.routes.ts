import { NamedRoutes } from '../../core/api/named-route';

export const docsViewRoutes: NamedRoutes = [
  {
    path: '',
    data: {
      name: 'Docs',
      hideInNavigation: true,
    },
    loadComponent: () =>
      import('./views/docs-default-view/docs-default-view.component').then(
        (v) => v.DocsDefaultViewComponent,
      ),
  },
  {
    path: 'installation',
    data: {
      name: 'Installation',
    },
    loadComponent: () =>
      import('./views/installation-view/installation-view.component').then(
        (v) => v.InstallationViewComponent,
      ),
  },
  {
    path: 'data-mock',
    data: {
      name: 'Data Mock',
    },
    loadComponent: () =>
      import('./views/data-mock-view/data-mock-view.component').then(
        (v) => v.DataMockViewComponent,
      ),
  },
  {
    path: 'api-mock',
    data: {
      name: 'API Mock',
    },
    loadComponent: () =>
      import('./views/api-mock-view/api-mock-view.component').then(
        (v) => v.ApiMockViewComponent,
      ),
  },
  {
    path: 'examples',
    data: {
      name: 'Examples',
    },
    loadComponent: () =>
      import('./views/examples-view/examples-view.component').then(
        (v) => v.ExamplesViewComponent,
      ),
  },
];
