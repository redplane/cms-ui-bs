import {InjectionToken} from '@angular/core';
import {HtmlContent, IDialogSettings} from '@cms-ui/core';

// Dialog settings
export const BS_DIALOG_SETTINGS_PROVIDER =
  new InjectionToken<IDialogSettings>('BS_DIALOG_SETTINGS_PROVIDER');

// Bootstrap icon provider.
export const BS_DIALOG_DEFAULT_WARNING_ICON_PROVIDER = new InjectionToken<HtmlContent>('BS_DIALOG_DEFAULT_WARNING_ICON_PROVIDER');
export const BS_DIALOG_DEFAULT_INFO_ICON_PROVIDER = new InjectionToken<HtmlContent>('BS_DIALOG_DEFAULT_INFO_ICON_PROVIDER');
export const BS_DIALOG_DEFAULT_CONFIRMATION_ICON_PROVIDER = new InjectionToken<HtmlContent>('BS_DIALOG_DEFAULT_CONFIRMATION_ICON_PROVIDER');
export const BS_DIALOG_DEFAULT_ERROR_ICON_PROVIDER = new InjectionToken<HtmlContent>('BS_DIALOG_DEFAULT_ERROR_ICON_PROVIDER');
