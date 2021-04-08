import {Component, Injector} from '@angular/core';
import {BasicDialogButton, DIALOG_SERVICE_PROVIDER, DialogResult, IDialogService} from '@cms-ui/core';
import {Subscription} from 'rxjs';
import {BsErrorDialogSettings} from '../../../../../cms-ui-bs/src/models/implementations/bs-error-dialog-settings';
import {BsDialogActions} from '@cms-ui/bootstrap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-event-demo',
  templateUrl: 'dialog-event-demo.component.html',
  styleUrls: ['dialog-event-demo.component.css']
})
export class DialogEventDemoComponent {

  //#region Properties

  // Whether option has been confirmed or not.
  // tslint:disable-next-line:variable-name
  private _confirmed: boolean | null = null;

  protected readonly subscription: Subscription;

  //#endregion

  //#region Services

  protected dialogService: IDialogService;

  //#endregion

  //#region Accessors

  public get confirmed(): boolean | null {
    return this._confirmed;
  }

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {
    this.dialogService = injector.get(DIALOG_SERVICE_PROVIDER);

    this.subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public displayDialog(): void {

    const yesDialogButton = new BasicDialogButton('OK', () => new DialogResult(BsDialogActions.manuallyClosed, true));
    const noDialogButton = new BasicDialogButton('Cancel', () => new DialogResult(BsDialogActions.dismissed, null));

    const dialogSettings = new BsErrorDialogSettings('Are you sure to delete a fake record ?', 'System warning');
    dialogSettings.buttons = [yesDialogButton, noDialogButton];

    const displayDialogSubscription = this.dialogService
      .displayDialogAsync<boolean>(dialogSettings)
      .subscribe(confirmed => {
      });

  }

  //#endregion
}
