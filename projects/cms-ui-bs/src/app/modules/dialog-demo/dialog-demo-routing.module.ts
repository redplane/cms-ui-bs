import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DialogDemoComponent} from './dialog-demo.component';

//#region Routes

const routes: Routes = [
  {
    path: '',
    component: DialogDemoComponent

  }
];

//#endregion

//#region Module export

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DialogDemoRoutingModule {

}

//#endregion
