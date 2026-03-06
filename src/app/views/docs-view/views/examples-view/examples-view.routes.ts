import { ExampleRoutes } from '../../../../core/api/example-routes';

export const examplesViewRoutes: ExampleRoutes = [
  {
    path: '',
    data: {
      name: 'Examples',
      hideInNavigation: true,
    },
    loadComponent: () =>
      import('./views/examples-default-view/examples-default-view.component').then(
        (v) => v.ExamplesDefaultViewComponent,
      ),
  },
  {
    path: 'mixed-basic',
    data: {
      name: 'Mixed Basic',
      properties: {
        tags: ['Mixed', 'Basic'],
        title: 'Mixed Basic',
        description: `Basic CRUD controller to manage users mocked within the controller.`,
      },
    },
    loadComponent: () =>
      import('./views/examples-mixed-basic-view/examples-mixed-basic-view.component').then(
        (v) => v.ExamplesMixedBasicViewComponent,
      ),
  },
];
