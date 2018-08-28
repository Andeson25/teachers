import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Pipe({
  name: 'nou'
})
export class NullOrUndefinedPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (isNullOrUndefined(value))
      return '';
    return value;
  }
}
