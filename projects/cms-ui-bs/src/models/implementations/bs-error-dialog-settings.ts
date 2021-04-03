import {ConfirmationDialogSettings} from '@cms-ui/core';
import {BsDialogKinds} from '../../constants';

export class BsErrorDialogSettings extends ConfirmationDialogSettings {

  //#region Properties

  public readonly kind = BsDialogKinds.error;

  public size?: 'sm' | 'lg' | 'xl' | string;

  //#endregion

}
