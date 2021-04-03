import {ConfirmationDialogSettings} from '@cms-ui/core';
import {BsDialogKinds} from '../../constants';

export class BsInfoDialogSettings extends ConfirmationDialogSettings {

  //#region Properties

  public readonly kind = BsDialogKinds.info;

  public size?: 'sm' | 'lg' | 'xl' | string;

  //#endregion

}
