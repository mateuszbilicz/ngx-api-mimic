import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideMonacoEditor } from 'ngx-monaco-editor-v2';
import { providePrimeNG } from 'primeng/config';
import Nora from '@primeuix/themes/nora';
import { BreadcrumbNavigationService } from './core/services/breadcrumb-navigation/breadcrumb-navigation.service';
import { mixedBasicExampleInterceptor } from './examples/mixed-basic-example';
import { mixedAdvancedExampleInterceptor } from './examples/mixed-advanced-example';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({
      ripple: true,
      inputVariant: 'outlined',
      overlayAppendTo: 'body',
      theme: {
        preset: Nora,
        options: {
          darkModeSelector: '.theme-dark',
        },
      },
    }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([mixedBasicExampleInterceptor, mixedAdvancedExampleInterceptor]),
    ),
    provideMonacoEditor(),
    BreadcrumbNavigationService,
  ],
};
