import {NgModule} from '@angular/core';
import {SideBarComponent} from './side-bar.component';
import {TranslateModule} from '@ngx-translate/core';
import {SmartNavigatorModule} from '@cms-ui/core';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        SideBarComponent
    ],
  imports: [
    TranslateModule,
    SmartNavigatorModule,
    RouterModule
  ],
    exports: [
        SideBarComponent
    ]
})
export class SideBarModule {

}
