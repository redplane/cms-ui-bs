import {IDialogButton, IDialogSetting} from '@cms-ui/core';

export interface IConfirmationDialogSettings extends IDialogSetting {

  //#region Properties

  // Action button
  buttons: IDialogButton[];

  //#endregion

}
