import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class AppConfigService {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private _appSettings: AppSettings;

  //#endregion

  //#region Constructors

  constructor(public httpClient: HttpClient) {
    this._appSettings = new AppSettings();
  }

  //#endregion

  //#region Application configuration

  /*
  * Load app configuration from json file.
  * */
  public loadSettingsAsync(): Promise<AppSettings> {
    return this.httpClient
      .get('/assets//appsettings.json')
      .toPromise()
      .then(data => {
        console.log(data);
        const options = data as AppSettings;
        this._appSettings = options;
        return options;
      });
  }

  /*
  * Load configuration from cache.
  * */
  public loadConfigurationFromCache(): AppSettings {
    return this._appSettings;
  }

  //#endregion
}
