import { Route } from '@angular/router';

export interface NamedRoute<T = any> extends Route {
  data: {
    name: string;
    icon?: string;
    hideInNavigation?: boolean;
    properties?: T;
  };
}

export type NamedRoutes = NamedRoute[];
