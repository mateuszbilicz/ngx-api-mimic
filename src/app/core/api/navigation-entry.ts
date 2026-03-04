import { LoadChildren } from '@angular/router';
import { MenuItem } from 'primeng/api';

export interface NavigationEntry extends MenuItem {
  path: string[];
  hasChildren?: boolean;
  childrenLoaded?: boolean;
  loading?: boolean;
  loadChildren?: LoadChildren;
  items?: NavigationEntry[];
  expanded?: boolean;
  id?: string;
}
