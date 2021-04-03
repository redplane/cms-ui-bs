import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {GuardModule} from '../guards/guard.module';
import {ServiceModule} from '../services/service.module';
import {ResolveModule} from '../resolves/resolve.module';
import {AuthenticatedLayoutComponent} from './shared/authenticated-layout/authenticated-layout.component';
import {IsAuthorizedGuard} from '../guards/is-authorized-guard';
import {ProfileResolve} from '../resolves/profile.resolve';
import {DashboardComponent} from './dashboard/dashboard.component';

//#endregion

//#region Properties

// Application routes configuration.
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
      },
      {
        path: '',
        component: AuthenticatedLayoutComponent,
        canActivate: [IsAuthorizedGuard],
        resolve: {
          profile: ProfileResolve
        },
        children: [
          {
            path: 'dashboard',
            pathMatch: 'full',
            loadChildren: () => import('./dashboard/dashboard.module')
              .then(m => m.DashboardModule)
          },
          {
            path: 'dialog-demo',
            loadChildren: () => import('./dialog-demo/dialog-demo.module').then(m => m.DialogDemoModule)
          }
        ]
      }
    ]
  }
];

//#endregion

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule, // required animations module
    HttpClientModule,

    // Application modules.
    GuardModule.forRoot(),
    ServiceModule.forRoot(),
    ResolveModule.forRoot(),
    RouterModule.forRoot(routes, {enableTracing: false, relativeLinkResolution: 'legacy'})
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})

export class AppRouteModule {
}
