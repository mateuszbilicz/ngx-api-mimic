import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './core/elements/navigation/navigation.component';
import { BreadcrumbNavigationComponent } from './core/elements/breadcrumb-navigation/breadcrumb-navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, BreadcrumbNavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
}
