import { MenuItem } from 'primeng/api';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { BreadcrumbNavigationService } from '../../services/breadcrumb-navigation/breadcrumb-navigation.service';

@Component({
  selector: 'app-breadcrumb-navigation',
  standalone: true,
  imports: [Breadcrumb],
  templateUrl: './breadcrumb-navigation.component.html',
  styleUrl: './breadcrumb-navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbNavigationComponent {
  private readonly breadcrumbService = inject(BreadcrumbNavigationService);

  items = this.breadcrumbService.breadcrumbItems;

  homeItem: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
}
