import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptor } from './test';
import { provideMonacoEditor } from 'ngx-monaco-editor-v2';
import { providePrimeNG } from 'primeng/config';
import Nora from '@primeuix/themes/nora';
import { BreadcrumbNavigationService } from './core/services/breadcrumb-navigation/breadcrumb-navigation.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({
      ripple: true,
      inputVariant: 'outlined',
      overlayOptions: {
        mode: 'modal'
      },
      overlayAppendTo: 'body',
      theme: {
        preset: Nora,
        options: {
          darkModeSelector: '.theme-dark',
        },
      },
    }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([interceptor])),
    provideMonacoEditor(),
    BreadcrumbNavigationService
  ],
};
