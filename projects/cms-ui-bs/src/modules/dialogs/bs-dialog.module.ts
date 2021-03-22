import {NgModule} from '@angular/core';
import {BsDialogComponent} from './bs-dialog.component';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    BsDialogComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [
    BsDialogComponent
  ]
})
export class BsDialogModule {
}
