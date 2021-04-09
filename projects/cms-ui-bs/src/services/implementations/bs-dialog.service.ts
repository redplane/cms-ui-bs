import {from, Observable, of, throwError} from 'rxjs';
import {Injector} from '@angular/core';
import {BsDialogComponent} from '../../modules/dialogs/bs-dialog.component';
import {DialogResult, IDialogService, IDialogSettings} from '@cms-ui/core';
import {BS_DIALOG_SETTINGS_PROVIDER} from '../../constants/injectors';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {map, mergeMap} from 'rxjs/operators';
import {BsDialogActions, CmsUiBsExceptions} from '../../constants';

export class BsDialogService implements IDialogService {

  //#region Properties

  // Injector to resolve services.
  private readonly injector: Injector;

  //#endregion

  //#region Services

  protected readonly dialogService: NgbModal;

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {
    this.injector = injector;
    this.dialogService = injector.get(NgbModal);
  }


  //#endregion

  //#region Methods

  public displayDialogAsync<T>(settings: IDialogSettings): Observable<T> {

    const childInjector = Injector.create({
      providers: [
        {
          provide: BS_DIALOG_SETTINGS_PROVIDER,
          useValue: settings
        }
      ],
      parent: settings.injector || this.injector
    });

    let dialogClass = '';
    if (settings && settings.dialogClasses && settings.dialogClasses.length) {
      dialogClass = settings.dialogClasses.join(' ');
    }

    let backdropClass = '';
    if (settings && settings.backdropClasses && settings.backdropClasses.length) {
      backdropClass = settings.backdropClasses.join(' ');
    }

    const dialogRef = this.dialogService.open(BsDialogComponent, {
      injector: childInjector,
      backdrop: settings.disableClose ? 'static' : true,
      modalDialogClass: dialogClass,
      centered: settings.centered,
      backdropClass,
      size: (settings as any).size || 'md'
    });

    return from(dialogRef.result)
      .pipe(
        mergeMap(dialogData => {

          if (typeof (dialogData) === 'boolean') {
            return of(dialogData as any);
          }

          if (dialogData instanceof DialogResult) {
            const dialogResult = dialogData as DialogResult<T>;
            if (dialogResult.action === BsDialogActions.manuallyClosed) {
              return of(dialogResult.data);
            }

            return throwError(CmsUiBsExceptions.dialogDismissed);
          }

          return throwError(CmsUiBsExceptions.invalidDialogResult);
        })
      );
  }

  public closeAll(): void {
  }

  //#endregion
}
