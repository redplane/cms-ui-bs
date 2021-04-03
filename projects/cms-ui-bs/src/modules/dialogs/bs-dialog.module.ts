import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {BsDialogComponent} from './bs-dialog.component';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {DIALOG_SERVICE_PROVIDER, IDialogService} from '@cms-ui/core';
import {BsDialogService} from '../../services/implementations/bs-dialog.service';
import {ToHtmlContentValuePipeModule} from '../../pipes/to-html-content-value-pipe.module';

const defaultBsDialogServiceFactory = (injector: Injector) => {
  return new BsDialogService(injector);
};

@NgModule({
  declarations: [
    BsDialogComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    ToHtmlContentValuePipeModule
  ],
  exports: [
    BsDialogComponent
  ],
  entryComponents: [
    BsDialogComponent
  ]
})
export class BsDialogModule {

  public static forRoot(): ModuleWithProviders<BsDialogModule> {
    return {
      ngModule: BsDialogModule,
      providers: [
        {
          provide: DIALOG_SERVICE_PROVIDER,
          useFactory: defaultBsDialogServiceFactory,
          deps: [Injector]
        }
      ]
    };
  }
}
