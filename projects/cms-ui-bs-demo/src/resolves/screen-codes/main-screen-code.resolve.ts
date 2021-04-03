import {DefaultScreenCodeResolver, IScreenCodeResolver} from '@cms-ui/core';
import {Injectable} from '@angular/core';
import {ScreenCodes} from '../../constants/screen-codes';

@Injectable()
export class MainScreenCodeResolve extends DefaultScreenCodeResolver {

  //#region Constructor

  constructor() {
    const codeToUrl: { [p: string]: string } = {};
    codeToUrl[ScreenCodes.dashboard] = '/dashboard';
    codeToUrl[ScreenCodes.dialogDemo] = '/dialog-demo';

    super(codeToUrl);
  }

//#endregion

  //#region Methods

  //#endregion

}
