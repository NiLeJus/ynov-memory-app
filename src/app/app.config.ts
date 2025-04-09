import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

import {
  HAMMER_GESTURE_CONFIG,
  HammerModule,
  HammerGestureConfig,
} from '@angular/platform-browser';

const ICONS_PATH = 'assets/icons/';

class CustomHammerConfig extends HammerGestureConfig {
  override overrides = {
    swipe: {
      direction: Hammer.DIRECTION_ALL,
      threshold: 5,
      velocity: 0.3, // Vitesse minimale },
    },
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFastSVG({
      url: (name: string) => `app-icons/${name}.svg`,
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(),
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    importProvidersFrom(HammerModule),
    provideServiceWorker('ngsw-worker.js'), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ],
};
