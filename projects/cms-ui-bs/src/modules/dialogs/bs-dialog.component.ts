import {Component, Injector, OnDestroy, TemplateRef} from '@angular/core';
import {BasicDialogButton, HtmlContent, IDialogButton} from '@cms-ui/core';
import {DefaultBsDialogComponent} from './default-bs-dialog.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'confirmation-dialog-bs',
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

  //#endregion

}
