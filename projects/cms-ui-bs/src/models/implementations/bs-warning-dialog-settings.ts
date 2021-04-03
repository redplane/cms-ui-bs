import {WarningDialogSettings} from '@cms-ui/core';
import {BsDialogKinds} from '../../constants/bs-dialog-kinds';

export class BsWarningDialogSettings extends WarningDialogSettings {

  //#region Properties

  public readonly kind = BsDialogKinds.warning;

  public size?: 'sm' | 'lg' | 'xl' | string;

  //#endregion

}
