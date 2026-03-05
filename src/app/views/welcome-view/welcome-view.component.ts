import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import packageJson from '../../../../projects/ngx-api-mimic/package.json';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-welcome-view',
  imports: [CardModule, ButtonModule, DividerModule, ChipModule],
  templateUrl: './welcome-view.component.html',
  styleUrl: './welcome-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeViewComponent {
  version = signal(packageJson.version);
  libName = signal(packageJson.name);
  description = signal(packageJson.description);
  authorName = signal(packageJson.author.name);
  authorUrl = signal(packageJson.author.url);
  authorGithubUrl = signal('https://github.com/mateuszbilicz');
  githubUrl = signal(packageJson.repository);

  features = signal([
    'Mock data and REST API simultaneously using @UsingSchema on Controllers',
    'Intelligent schema-based mocked data generation via TypeScript interfaces',
    'Automated mocked data storage in the browser\'s LocalStorage',
    'Complete mock backend features: angular interceptor, router, controllers, decorators, and guards',
    'Easily migrate mocked API to NestJS thanks to identical API decorators and architecture'
  ]);
}
