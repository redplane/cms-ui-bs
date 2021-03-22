import {Component, Inject, Injector, Input, OnDestroy, TemplateRef} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {first, tap} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';
import {
  BasicDialogButton,
  ConfirmationDialogSettings, DialogKindConstant,
  DialogResult, ErrorDialogSettings,
  HtmlContent,
  IDialogButton,
  IDialogSettings, InfoDialogSettings,
  TemplateDialogButton, WarningDialogSettings
} from '@cms-ui/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogActionConstant} from '../../constants/dialog-action.constant';
import {BS_DIALOG_SETTINGS_PROVIDER} from '../../constants/injector.constant';

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

      this._activeDialog.close(new DialogResult(DialogActionConstant.manuallyClosed, null));
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

    if (this._settings instanceof ConfirmationDialogSettings) {
      return DialogKindConstant.confirmation;
    }

    if (this._settings instanceof InfoDialogSettings) {
      return DialogKindConstant.info;
    }

    if (this._settings instanceof WarningDialogSettings) {
      return DialogKindConstant.warning;
    }

    if (this._settings instanceof ErrorDialogSettings) {
      return DialogKindConstant.error;
    }

    return null;
  }

  public getIcon(): HtmlContent | TemplateRef<any> | undefined {

    // Icon.
    let icon: HtmlContent | TemplateRef<any> | undefined;

    if (this._settings instanceof ConfirmationDialogSettings) {
      icon = (this._settings as ConfirmationDialogSettings).icon;
    } else if (this._settings instanceof InfoDialogSettings) {
      icon = (this._settings as InfoDialogSettings).icon;
    } else if (this._settings instanceof WarningDialogSettings) {
      icon = (this._settings as WarningDialogSettings).icon;
    } else if (this._settings instanceof ErrorDialogSettings) {
      icon = (this._settings as ErrorDialogSettings).icon;
    }

    if (!icon) {
      return undefined;
    }

    return undefined;
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
