import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    DialogService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideAnimationsAsync(),
    MessageService,
  ]
};
