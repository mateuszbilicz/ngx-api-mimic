import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-welcome-view',
  imports: [],
  templateUrl: './welcome-view.component.html',
  styleUrl: './welcome-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeViewComponent {}
