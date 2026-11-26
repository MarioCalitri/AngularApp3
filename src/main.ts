import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // or { App } if src/app/app.ts exports App

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));