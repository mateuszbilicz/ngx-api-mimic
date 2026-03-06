import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AppTitleService {
  protected readonly title = inject(Title);

  setTitle(title: string): void {
    this.title.setTitle('API Mimic | ' + title);
  }
}
