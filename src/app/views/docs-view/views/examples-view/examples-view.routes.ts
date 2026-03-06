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
    path: 'data-mock-basic',
    data: {
      name: 'Data Mock Basic',
      properties: {
        tags: ['Data Mock', 'Basic'],
        title: 'Data Mock Basic',
        description: `Simplest data mock schema demonstrating basic CRUD methods.`,
      },
    },
    loadComponent: () =>
      import('./views/examples-data-mock-basic-view/examples-data-mock-basic-view.component').then(
        (v) => v.ExamplesDataMockBasicViewComponent,
      ),
  },
  {
    path: 'data-mock-advanced',
    data: {
      name: 'Data Mock Advanced',
      properties: {
        tags: ['Data Mock', 'Advanced'],
        title: 'Data Mock Advanced',
        description: `Advanced schema referencing other mocked classes, enums, custom parsing and methods interacting with internal API.`,
      },
    },
    loadComponent: () =>
      import('./views/examples-data-mock-advanced-view/examples-data-mock-advanced-view.component').then(
        (v) => v.ExamplesDataMockAdvancedViewComponent,
      ),
  },
  {
    path: 'api-mock-basic',
    data: {
      name: 'API Mock Basic',
      properties: {
        tags: ['API Mock', 'Basic'],
        title: 'API Mock Basic',
        description: `Simple API endpoints returning strings and keeping generic state across requests.`,
      },
    },
    loadComponent: () =>
      import('./views/examples-api-mock-basic-view/examples-api-mock-basic-view.component').then(
        (v) => v.ExamplesApiMockBasicViewComponent,
      ),
  },
  {
    path: 'api-mock-advanced',
    data: {
      name: 'API Mock Advanced',
      properties: {
        tags: ['API Mock', 'Advanced'],
        title: 'API Mock Advanced',
        description: `Very advanced controller with validation and roles guarded by token based authorizations.`,
      },
    },
    loadComponent: () =>
      import('./views/examples-api-mock-advanced-view/examples-api-mock-advanced-view.component').then(
        (v) => v.ExamplesApiMockAdvancedViewComponent,
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
  {
    path: 'mixed-advanced',
    data: {
      name: 'Mixed Advanced',
      properties: {
        tags: ['Mixed', 'Advanced'],
        title: 'Mixed Advanced',
        description: `Advanced CRUD controller to manage users mocked within the controller.`,
      },
    },
    loadComponent: () =>
      import('./views/examples-mixed-advanced-view/examples-mixed-advanced-view.component').then(
        (v) => v.ExamplesMixedAdvancedViewComponent,
      ),
  },
];
