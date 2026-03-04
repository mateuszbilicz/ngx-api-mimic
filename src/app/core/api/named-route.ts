import { Route } from '@angular/router';

export interface NamedRoute
  extends Route {
  data: {
    name: string;
    icon?: string;
    hideInNavigation?: boolean;
  }
}

export type NamedRoutes = NamedRoute[];
