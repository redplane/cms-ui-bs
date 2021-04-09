import {NgModule} from '@angular/core';
import {DialogEventDemoComponent} from './dialog-event-demo.component';
import {DialogEventDemoRoutingModule} from './dialog-event-demo-routing.module';
import {CommonModule} from '@angular/common';
import {BsDialogModule} from '@cms-ui/bootstrap';

@NgModule({
  imports: [
    DialogEventDemoRoutingModule,
    CommonModule,
    BsDialogModule.forRoot()
  ],
  declarations: [
    DialogEventDemoComponent
  ],
  exports: [
    DialogEventDemoComponent
  ]
})
export class DialogEventDemoModule {
}
