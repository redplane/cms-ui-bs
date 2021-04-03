import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DialogDemoComponent} from './dialog-demo.component';

const routes: Routes = [
  {
    path: '',
    component: DialogDemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DialogDemoRoutingModule {

}
