import {Component, Injector, OnDestroy, TemplateRef} from '@angular/core';
import {DefaultBsDialogComponent} from './default-bs-dialog.component';
import {
  BasicDialogButton,
  ConfirmationDialogSettings,
  DialogKindConstant, ErrorDialogSettings,
  HtmlContent,
  IDialogButton, InfoDialogSettings,
  WarningDialogSettings
} from '@cms-ui/core';
import {BsWarningDialogSettings} from '../../models/implementations/bs-warning-dialog-settings';
import {BsDialogKinds} from '../../constants/bs-dialog-kinds';
import {BsConfirmationDialogSettings} from '../../models/implementations/bs-confirmation-dialog-settings';
import {BsErrorDialogSettings} from '../../models/implementations/bs-error-dialog-settings';
import {BsInfoDialogSettings} from '../../models/implementations/bs-info-dialog-settings';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-dialog',
  styleUrls: ['./bs-dialog.component.scss'],
  templateUrl: './bs-dialog.component.html'
})
export class BsDialogComponent extends DefaultBsDialogComponent implements OnDestroy {

  //#region Accessors

  // Modal dialog id.
  public get id(): string {
    return this._id;
  }

  //#endregion

  //#region Constructor

  // tslint:disable-next-line:variable-name
  public constructor(injector: Injector) {
    super(injector);
  }

  //#endregion

  //#region Methods

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion

  //#region Methods

  public getDialogButtonClass(dialogButton: IDialogButton): string | null {

    if (!(dialogButton instanceof BasicDialogButton)) {
      return null;
    }

    const basicDialogButton = dialogButton as BasicDialogButton;
    if (!basicDialogButton.classes || !basicDialogButton.classes.length) {
      return null;
    }

    return basicDialogButton.classes.join(' ');
  }

  // Get button content type.
  public getButtonContentType(content: string | HtmlContent | TemplateRef<any>): 'string' | 'html' | 'template' {
    if (content instanceof HtmlContent) {
      return 'html';
    }

    if (content instanceof TemplateRef) {
      return 'template';
    }

    return 'string';
  }

  public getTitleBackgroundColor(): string {

    // Confirmation dialog.
    if (this._settings instanceof ConfirmationDialogSettings || this._settings instanceof BsConfirmationDialogSettings
      || this._settings.kind === DialogKindConstant.confirmation || this._settings.kind === BsDialogKinds.confirmation) {
      return 'bg-primary';
    }

    // Error dialog.
    if (this._settings instanceof ErrorDialogSettings || this._settings instanceof BsErrorDialogSettings
      || this._settings.kind === DialogKindConstant.error || this._settings.kind === BsDialogKinds.error) {
      return 'bg-danger';
    }

    // Info dialog.
    if (this._settings instanceof InfoDialogSettings || this._settings instanceof BsInfoDialogSettings
      || this._settings.kind === DialogKindConstant.info || this._settings.kind === BsDialogKinds.info) {
      return 'bg-info';
    }

    // Warning dialog.
    if (this._settings instanceof WarningDialogSettings || this._settings instanceof BsWarningDialogSettings
      || this._settings.kind === DialogKindConstant.warning || this._settings.kind === BsDialogKinds.warning) {
      return 'bg-warning';
    }

    return '';
  }

  //#endregion

}
