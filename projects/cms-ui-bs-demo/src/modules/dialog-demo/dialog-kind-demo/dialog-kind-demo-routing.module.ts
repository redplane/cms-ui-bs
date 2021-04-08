import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DialogKindDemoComponent} from './dialog-kind-demo.component';

const routes: Routes = [
  {
    path: '',
    component: DialogKindDemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DialogKindDemoRoutingModule {

}
