export class LoginViewModel {

  //#region Properties

  // Account email address.
  public email: string;

  // Account password.
  public password: string;

  //#endregion

  //#region Constructor

  public constructor() {
    this.email = '';
    this.password = '';
  }

  //#endregion
}
