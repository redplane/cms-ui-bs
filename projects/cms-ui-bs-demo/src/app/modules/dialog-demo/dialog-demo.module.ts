import {NgModule} from '@angular/core';
import {DialogDemoComponent} from './dialog-demo.component';
import {DialogDemoRoutingModule} from './dialog-demo-routing.module';
import {DIALOG_BUILDER_PROVIDER, DIALOG_SERVICE_PROVIDER} from '@cms-ui/core';
import {BasicDialogService} from '../../services/implementations/dialog/basic-dialog.service';
import {BasicBsDialogBuilder} from '../../services/implementations/dialog/basic-bs-dialog.builder';
import {BasicBsDialogModule} from '../shared/basic-bs-dialog/basic-bs-dialog.module';


@NgModule({
  imports: [
    DialogDemoRoutingModule,
    BasicBsDialogModule,
  ],
  declarations: [
    DialogDemoComponent
  ],
  exports: [
    DialogDemoComponent
  ],
  providers: [
    {
      provide: DIALOG_BUILDER_PROVIDER,
      useClass: BasicBsDialogBuilder,
      multi: true
    },
    {
      provide: DIALOG_SERVICE_PROVIDER,
      useClass: BasicDialogService
    }
  ]
})
export class DialogDemoModule {

}
