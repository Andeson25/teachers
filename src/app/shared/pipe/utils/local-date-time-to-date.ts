import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';


@Pipe({name: 'date'})
export class LocalDateTimeToDate implements PipeTransform {
  //send date from backEnd in format "yyyymmddthhmmss "
  transform(value: string, ...args): any {
    if (isNullOrUndefined(value))
      return '';
    else {
      let tempArr = value.substring(0, 16).replace('-', '.').replace('T', ' ').replace('-', '.').split(' ');
      if (tempArr.length > 1)
        tempArr.splice(1, 0, ' в ');
      value = tempArr.join(' ');
      return value;
    }
  }

}
