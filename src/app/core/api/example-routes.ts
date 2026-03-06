import { NamedRoute } from './named-route';

const AvailableTags = ['API Mock', 'Data Mock', 'Mixed', 'Basic', 'Advanced'] as const;

type Tag = (typeof AvailableTags)[number];

export interface ExampleRouteProperties {
  tags: Tag[];
  title: string;
  description: string;
}

export type ExampleRoute = NamedRoute<ExampleRouteProperties>;
export type ExampleRoutes = ExampleRoute[];
