import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPageComponent } from '../../../../core/elements/doc-page/doc-page.component';
import { CommandComponent } from '../../../../core/elements/command/command.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-installation-view',
  imports: [DocPageComponent, CommandComponent, RouterLink],
  templateUrl: './installation-view.component.html',
  styleUrl: './installation-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationViewComponent {}
