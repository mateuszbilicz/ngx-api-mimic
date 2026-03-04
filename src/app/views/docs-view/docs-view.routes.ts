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
];
