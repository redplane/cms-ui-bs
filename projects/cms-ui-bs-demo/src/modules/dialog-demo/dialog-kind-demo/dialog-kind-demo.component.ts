import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {
  ConfirmationDialogSettings,
  DIALOG_SERVICE_PROVIDER,
  ErrorDialogSettings,
  HtmlContent,
  IDialogService, InfoDialogSettings,
  WarningDialogSettings
} from '@cms-ui/core';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-demo',
  templateUrl: 'dialog-kind-demo.component.html',
  styleUrls: ['dialog-kind-demo.component.scss']
})
export class DialogKindDemoComponent implements OnInit, OnDestroy {

  //#region Properties

  protected readonly subscription: Subscription;

  //#endregion

  //#region Accessors

  protected readonly dialogService: IDialogService;

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {

    // Subscription initialization.
    this.subscription = new Subscription();

    this.dialogService = injector.get(DIALOG_SERVICE_PROVIDER);
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {
  }


  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  //#endregion

  //#region Methods

  public displayConfirmationDialog(defaultIcon?: boolean): void {
    const messageHtmlContent = new HtmlContent(`<h3 class="text-center text-primary font-weight-bold">This is confirmation message</h3>`);
    const confirmationDialogSettings = new ConfirmationDialogSettings(messageHtmlContent,
      'This is dialog title');

    if (!defaultIcon) {
      confirmationDialogSettings.icon = new HtmlContent(`<div class="text-center"><img class="img-fluid text-center" src="/assets/images/confirmation.png"></div>`);
    }

    const displayDialogSubscription = this.dialogService
      .displayDialogAsync(confirmationDialogSettings)
      .subscribe();

    this.subscription.add(displayDialogSubscription);
  }

  public displayErrorDialog(defaultIcon?: boolean): void {
    const messageHtmlContent = new HtmlContent(`<h3 class="text-center text-danger font-weight-bold">This is danger message</h3>`);
    const confirmationDialogSettings = new ErrorDialogSettings(messageHtmlContent,
      'This is dialog title');

    if (!defaultIcon) {
      confirmationDialogSettings.icon = new HtmlContent(`<div class="text-center"><img class="img-fluid" src="/assets/images/danger.png"></div>`);
    }

    const displayDialogSubscription = this.dialogService
      .displayDialogAsync(confirmationDialogSettings)
      .subscribe();

    this.subscription.add(displayDialogSubscription);
  }

  public displayInfoDialog(defaultIcon?: boolean): void {
    const messageHtmlContent = new HtmlContent(`<h3 class="text-center text-info font-weight-bold">This is info message</h3>`);
    const confirmationDialogSettings = new InfoDialogSettings(messageHtmlContent,
      'This is dialog title');

    if (!defaultIcon) {
      confirmationDialogSettings.icon = new HtmlContent(`<div class="text-center"><img class="img-fluid" src="/assets/images/info.png"></div>`);
    }

    const displayDialogSubscription = this.dialogService
      .displayDialogAsync(confirmationDialogSettings)
      .subscribe();

    this.subscription.add(displayDialogSubscription);
  }

  public displayWarningDialog(defaultIcon?: boolean): void {

    const messageHtmlContent = new HtmlContent(`<h3 class="text-center text-warning font-weight-bold">This is warning message</h3>`);
    const warningDialogSettings = new WarningDialogSettings(messageHtmlContent,
      'This is dialog title');

    if (!defaultIcon) {
      // tslint:disable-next-line:max-line-length
      warningDialogSettings.icon = new HtmlContent(`<div class="text-center"><img class="img-fluid" src="/assets/images/warning.png"></div>`);
    }

    const displayWarningDialogSubscription = this.dialogService
      .displayDialogAsync(warningDialogSettings)
      .subscribe();

    this.subscription.add(displayWarningDialogSubscription);
  }

  //#endregion
}
