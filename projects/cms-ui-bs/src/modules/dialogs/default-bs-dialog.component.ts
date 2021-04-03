import {Component, InjectFlags, Injector, OnDestroy, TemplateRef} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {first, tap} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BsDialogActions} from '../../constants/bs-dialog-actions';
import {
  BS_DIALOG_DEFAULT_CONFIRMATION_ICON_PROVIDER,
  BS_DIALOG_DEFAULT_ERROR_ICON_PROVIDER, BS_DIALOG_DEFAULT_INFO_ICON_PROVIDER,
  BS_DIALOG_DEFAULT_WARNING_ICON_PROVIDER,
  BS_DIALOG_SETTINGS_PROVIDER
} from '../../constants/injectors';
import {
  BasicDialogButton,
  ConfirmationDialogSettings,
  DialogKindConstant,
  DialogResult,
  ErrorDialogSettings,
  HtmlContent,
  IDialogButton,
  IDialogSettings,
  InfoDialogSettings,
  TemplateDialogButton,
  WarningDialogSettings
} from '@cms-ui/core';
import {BsWarningDialogSettings} from '../../models/implementations/bs-warning-dialog-settings';
import {BsDialogKinds} from '../../constants/bs-dialog-kinds';
import {BsConfirmationDialogSettings} from '../../models/implementations/bs-confirmation-dialog-settings';
import {BsErrorDialogSettings} from '../../models/implementations/bs-error-dialog-settings';
import {BsInfoDialogSettings} from '../../models/implementations/bs-info-dialog-settings';

@Component({
  template: ''
})
export abstract class DefaultBsDialogComponent implements OnDestroy {

  //#region Properties

  // Id of modal component.
  // tslint:disable-next-line:variable-name
  protected readonly _id: string;

  // Subscription watch list.
  // tslint:disable-next-line:variable-name
  protected readonly _subscription: Subscription;

  // Settings of dialog.
  // tslint:disable-next-line:variable-name
  protected readonly _settings!: IDialogSettings;

  // tslint:disable-next-line:variable-name
  private readonly _activeDialog: NgbActiveModal;


  //#endregion

  //#region Accessors

  // Modal dialog id.
  public get id(): string {
    return this._id;
  }

  // Title of dialog.
  public get title(): string | HtmlContent | TemplateRef<any> {
    return this._settings.title || '';
  }

  // Buttons of dialog.
  public get buttons(): IDialogButton[] {
    return this._settings.buttons || [];
  }

  // Dialog message.
  public get message(): string | HtmlContent | TemplateRef<any> {
    return this._settings.message;
  }

  // Dialog kinds.
  public get dialogKinds(): typeof DialogKindConstant {
    return DialogKindConstant;
  }

  //#endregion

  //#region Constructor

  // tslint:disable-next-line:variable-name
  protected constructor(private _injector: Injector) {
    this._id = uuid();
    this._subscription = new Subscription();

    this._activeDialog = _injector.get(NgbActiveModal);

    // Basic dialog settings.
    this._settings = _injector.get(BS_DIALOG_SETTINGS_PROVIDER) || {};
  }

  //#endregion

  //#region Methods

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  // Called when modal button is clicked.
  public dialogButtonClicked(clickedButton: IDialogButton): void {

    if (!this._activeDialog) {
      throw new Error('Invalid activated dialog');
    }

    // Click handler is not found.
    if (!clickedButton.clickHandler) {
      throw new Error('Invalid button handler');
    }

    // Call the handler.
    const handlerResult = clickedButton.clickHandler();
    if (typeof (handlerResult) === 'boolean') {

      // Modal shouldn't be closed.
      if (!handlerResult) {
        return;
      }

      this._activeDialog.close(new DialogResult(BsDialogActions.manuallyClosed, null));
      return;
    }

    // Handler is modal result.
    if (handlerResult instanceof DialogResult) {
      this._activeDialog.close(handlerResult as DialogResult<any>);
      return;
    }

    if (handlerResult instanceof Observable) {
      const observable = handlerResult as Observable<any>;
      observable
        .pipe(
          first(),
          tap(value => {
            if (!(value instanceof DialogResult)) {
              throw new Error('Value must be an instance of DialogResult');
            }
          })
        )
        .subscribe(value => {
          this._activeDialog.close(value);
        });
    }
  }

  // Get type of button.
  public getButtonType(button: IDialogButton): string {
    if (button instanceof TemplateDialogButton) {
      return 'template';
    }

    if (button instanceof BasicDialogButton) {
      return 'basic';
    }

    throw new Error('Unknown modal button type');
  }

  // Get modal title type.
  public getTitleType(): 'string' | 'html' | 'template' {

    // Title is template reference.
    if (this._settings.title instanceof TemplateRef) {
      return 'template';
    }

    if (this._settings.title instanceof HtmlContent) {
      return 'html';
    }

    return 'string';
  }

  // Get modal message type.
  public getMessageType(): 'string' | 'html' | 'template' {

    // Title is template reference.
    if (this._settings.message instanceof TemplateRef) {
      return 'template';
    }

    if (this._settings.message instanceof HtmlContent) {
      return 'html';
    }

    return 'string';
  }

  // Get dialog kind.
  public getDialogKind(): string | null {

    if (this._settings instanceof ConfirmationDialogSettings || this._settings.kind === DialogKindConstant.confirmation) {
      return DialogKindConstant.confirmation;
    }

    if (this._settings instanceof BsConfirmationDialogSettings || this._settings.kind === BsDialogKinds.confirmation) {
      return BsDialogKinds.confirmation;
    }

    if (this._settings instanceof ErrorDialogSettings || this._settings.kind === DialogKindConstant.error) {
      return DialogKindConstant.error;
    }

    if (this._settings instanceof BsErrorDialogSettings || this._settings.kind === BsDialogKinds.error) {
      return BsDialogKinds.error;
    }

    if (this._settings instanceof InfoDialogSettings || this._settings.kind === DialogKindConstant.info) {
      return DialogKindConstant.info;
    }

    if (this._settings instanceof BsInfoDialogSettings || this._settings.kind === BsDialogKinds.info) {
      return BsDialogKinds.info;
    }

    if (this._settings instanceof WarningDialogSettings || this._settings.kind === DialogKindConstant.warning) {
      return DialogKindConstant.warning;
    }

    if (this._settings instanceof BsWarningDialogSettings || this._settings.kind === BsDialogKinds.warning) {
      return BsDialogKinds.warning;
    }

    return null;
  }

  public getIcon(): HtmlContent | TemplateRef<any> | undefined {

    // Icon.
    let icon: HtmlContent | TemplateRef<any> | undefined = (this._settings as any).icon;

    if (icon) {
      return icon;
    }

    const dialogKind = this.getDialogKind();
    switch (dialogKind) {
      case DialogKindConstant.confirmation:
      case BsDialogKinds.confirmation:
        icon = this._injector
          .get(BS_DIALOG_DEFAULT_CONFIRMATION_ICON_PROVIDER, null, InjectFlags.Optional) || undefined;
        break;

      case DialogKindConstant.error:
      case BsDialogKinds.error:
        icon = this._injector
          .get(BS_DIALOG_DEFAULT_ERROR_ICON_PROVIDER, null, InjectFlags.Optional) || undefined;
        break;

      case DialogKindConstant.info:
      case BsDialogKinds.info:
        icon = this._injector
          .get(BS_DIALOG_DEFAULT_INFO_ICON_PROVIDER, null, InjectFlags.Optional) || undefined;
        break;

      case DialogKindConstant.warning:
      case BsDialogKinds.warning:
        icon = this._injector.get(BS_DIALOG_DEFAULT_WARNING_ICON_PROVIDER, undefined, InjectFlags.Optional);
        break;
    }
    return icon;
  }

  public getIconKind(): 'html' | 'template' | undefined {

    const icon = this.getIcon();

    if (icon instanceof HtmlContent) {
      return 'html';
    }

    if (icon instanceof TemplateRef) {
      return 'template';
    }

    return undefined;
  }

  //#endregion

}
