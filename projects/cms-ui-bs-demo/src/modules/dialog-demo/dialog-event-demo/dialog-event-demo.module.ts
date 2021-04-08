import {NgModule} from '@angular/core';
import {DialogEventDemoComponent} from './dialog-event-demo.component';
import {DialogEventDemoRoutingModule} from './dialog-event-demo-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    DialogEventDemoRoutingModule,
    CommonModule
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
