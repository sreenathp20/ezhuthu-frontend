import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import {environment} from './environments/environments'


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  if (environment.production) {
    //enableProdMode();
  }
  throw new Error('White screen, reveal yourself!');
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
