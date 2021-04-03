import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRouteModule} from './app.route';
import {AppConfigService} from '../services/implementations/app-config.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../factories/ngx-translate.factory';
import {HttpClient} from '@angular/common/http';
import {NgRxMessageBusModule} from 'ngrx-message-bus';
import {appConfigServiceFactory} from '../factories/app-setting.factory';
import {SMART_NAVIGATOR_SCREEN_CODE_RESOLVER, SmartNavigatorModule} from '@cms-ui/core';
import {MainScreenCodeResolve} from '../resolves/screen-codes/main-screen-code.resolve';

//#region Module declaration

@NgModule({
  declarations: [],
  imports: [
    AppRouteModule,

    // Message bus registration.
    NgRxMessageBusModule.forRoot(),
    SmartNavigatorModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigServiceFactory,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: SMART_NAVIGATOR_SCREEN_CODE_RESOLVER,
      useClass: MainScreenCodeResolve,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}

//#endregion
