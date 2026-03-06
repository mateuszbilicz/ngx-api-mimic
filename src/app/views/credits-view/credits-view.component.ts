import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { AppTitleService } from '../../core/services/app-title/app-title.service';

interface Contributor {
  avatarUrl: string;
  name: string;
  url: string;
}

interface Gist {
  name: string;
  url: string;
  description: string;
  author: { name: string; url: string };
}

interface Other {
  name: string;
  icon: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-credits-view',
  imports: [CardModule, DividerModule, AvatarModule, ButtonModule],
  templateUrl: './credits-view.component.html',
  styleUrl: './credits-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HttpClient],
})
export class CreditsViewComponent implements OnInit {
  protected readonly appTitleService = inject(AppTitleService);
  protected readonly httpClient = inject(HttpClient);
  protected readonly destroyRef = inject(DestroyRef);
  contributorsUsernames = signal<string[]>(['mateuszbilicz']);
  contributors = signal<Record<string, Contributor>>({});
  gists = signal<Gist[]>([
    {
      name: 'array-names.py',
      url: 'https://gist.github.com/ruanbekker/a1506f06aa1df06c5a9501cb393626ea',
      author: { name: '@ruanbekker', url: 'https://gist.github.com/ruanbekker' },
      description: 'List of first names used in data mock.',
    },
    {
      name: 'last_names.php',
      url: 'https://gist.github.com/subodhghulaxe/8148971',
      author: { name: '@subodhghulaxe', url: 'https://gist.github.com/subodhghulaxe' },
      description: 'List of last names used in data mock.',
    },
  ]);
  others = signal<Other[]>([
    {
      name: 'NestJS',
      icon: 'https://docs.nestjs.com/assets/logo-small-gradient.svg',
      description: `Node.js framework built to look like Angular. It was my inspiration to write this library the way it looks.`,
      url: 'https://nestjs.com/',
    },
    {
      name: 'Gemini',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/120px-Google_Gemini_icon_2025.svg.png',
      description: `AI model that helped me with some stuff and became main /docs maintainer.`,
      url: 'https://gemini.google/about/',
    },
  ]);

  constructor() {
    this.appTitleService.setTitle('Credits');
  }

  ngOnInit() {
    this.contributorsUsernames().forEach((contributor) => {
      this.gitGetUser(contributor);
    });
  }

  private gitGetUser(username: string) {
    this.httpClient
      .get('https://api.github.com/users/' + username)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.contributors.update((contributors) => ({
          ...contributors,
          [username]: {
            avatarUrl: res.avatar_url,
            name: res.name,
            url: res.html_url,
          },
        }));
      });
  }
}
