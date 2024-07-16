import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { bearerTokenInterceptorProvider } from './interceptors/providers/intreceptor-providers';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes)]
  providers: [
    provideRouter(routes),
    // provideHttpClient(),
    importProvidersFrom(HttpClientModule),//ovo mora zbog interceptora, zakomentarisati gornju
    // provideAnimations(),
    bearerTokenInterceptorProvider, provideAnimationsAsync()
  ],
};
