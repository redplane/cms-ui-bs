import {ConfirmationDialogSettings} from '@cms-ui/core';
import {BsDialogKinds} from '../../constants';

export class BsConfirmationDialogSettings extends ConfirmationDialogSettings {

  //#region Properties

  public readonly kind = BsDialogKinds.confirmation;

  public size?: 'sm' | 'lg' | 'xl' | string;

  //#endregion

}
