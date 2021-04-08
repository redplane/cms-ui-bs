import {NgModule} from '@angular/core';
import {DialogKindDemoRoutingModule} from './dialog-kind-demo-routing.module';
import {DialogKindDemoComponent} from './dialog-kind-demo.component';
import {TranslateModule} from '@ngx-translate/core';
import {
  BS_DIALOG_DEFAULT_CONFIRMATION_ICON_PROVIDER,
  BS_DIALOG_DEFAULT_ERROR_ICON_PROVIDER, BS_DIALOG_DEFAULT_INFO_ICON_PROVIDER,
  BS_DIALOG_DEFAULT_WARNING_ICON_PROVIDER,
  BsDialogModule
} from '@cms-ui/bootstrap';
import {HtmlContent} from '@cms-ui/core';

@NgModule({
  declarations: [
    DialogKindDemoComponent
  ],
  imports: [
    DialogKindDemoRoutingModule,
    TranslateModule,
    BsDialogModule.forRoot()
  ],
  providers: [
    {
      provide: BS_DIALOG_DEFAULT_WARNING_ICON_PROVIDER,
      useValue: new HtmlContent(`<div class="text-center"><img class="img img-fluid" src="/assets/images/sniper-warning.png"></div>`)
    },
    {
      provide: BS_DIALOG_DEFAULT_CONFIRMATION_ICON_PROVIDER,
      useValue: new HtmlContent(`<div class="text-center"><img class="img img-fluid" src="/assets/images/sniper-warning.png"></div>`)
    },
    {
      provide: BS_DIALOG_DEFAULT_ERROR_ICON_PROVIDER,
      useValue: new HtmlContent(`<div class="text-center"><img class="img img-fluid" src="/assets/images/sniper-warning.png"></div>`)
    },
    {
      provide: BS_DIALOG_DEFAULT_INFO_ICON_PROVIDER,
      useValue: new HtmlContent(`<div class="text-center"><img class="img img-fluid" src="/assets/images/sniper-warning.png"></div>`)
    }
  ]
})
export class DialogKindDemoModule {
}
