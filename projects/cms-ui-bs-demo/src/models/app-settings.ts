export class AppSettings {

  //#region Properties

  // Locale of application.
  public locale: string;

  // Api end-point url.
  public baseUrl: string;

  //#endregion

  //#region Constructor

  public constructor() {
    this.locale = 'en-US';
    this.baseUrl = '';
  }

  //#endregion

}
