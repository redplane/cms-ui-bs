import {NgModule} from '@angular/core';
import {ToHtmlContentValuePipe} from './to-html-content-value.pipe';

@NgModule({
  declarations: [
    ToHtmlContentValuePipe
  ],
  exports: [
    ToHtmlContentValuePipe
  ]
})
export class ToHtmlContentValuePipeModule {
}
