import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  /**
   * @description Transforms array of strings into comma separated words
   * @param {string[]} value
   * @param {...any[]} args
   * @returns {*}
   * @memberof ListPipe
   */
  transform(value: string[], ...args: any[]): any {
    return value.join(', ');
  }

}
