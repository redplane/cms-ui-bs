import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DialogEventDemoComponent} from './dialog-event-demo.component';

const routes: Routes = [
  {
    path: 'dialog-event',
    component: DialogEventDemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DialogEventDemoRoutingModule {

}
