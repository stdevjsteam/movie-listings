import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(value: string[], ...args: any[]): any {
    return value.join(', ');
  }

}
