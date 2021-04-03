export class ProfileViewModel {

  //#region Properties

  /*
  * Nickname of account.
  * */
  public nickname: string;

  /*
  * Photo relative url.
  * */
  public photoRelativeUrl: string;

  /*
  * When account joined into system.
  * */
  public joinedTime: number;

  /*
  * Email of account.
  * */
  public email: string;

  //#endregion

  //#region Constructor

  public constructor() {
    this.nickname = '';
    this.photoRelativeUrl = '';
    this.joinedTime = 0;
    this.email = '';
  }

  //#endregion

}
