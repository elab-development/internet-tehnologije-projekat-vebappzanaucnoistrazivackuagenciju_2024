import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes)]
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // importProvidersFrom(HttpClientModule),//ovo mora zbog interceptora, zakomentarisati gornju
    // provideAnimations(),
    // bearerTokenInterceptorProvider
  ],
};
