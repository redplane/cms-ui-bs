import {Pipe, PipeTransform} from '@angular/core';
import {HtmlContent} from '@cms-ui/core';

@Pipe({
  name: 'toHtmlContentValue'
})
export class ToHtmlContentValuePipe implements PipeTransform {

  //#region Methods

  public transform(value: HtmlContent | any, ...args: any[]): string | undefined {

    if (value instanceof HtmlContent) {
      const actualHtmlContent = value as HtmlContent;
      return actualHtmlContent.content;
    }

    return undefined;
  }

  //#endregion

}
