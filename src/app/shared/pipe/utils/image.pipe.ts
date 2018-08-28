import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {url} from '../../config/url';

@Pipe({
  name: 'ImgPipe'
})
export class ImagePipe implements PipeTransform {

  transform(value: any, ...args): any {
    // console.log(`pipe in, args : ${JSON.stringify(args)}`);
    if (args.length > 0) {
      console.log('pipe if');
      (<HTMLElement>args[0]).onerror = () => {
        console.log('miniayu fotku');
        // console.log(e);
        args[0].style = 'background-image:url("/assets/loader/loading.gif")';
      };
    }
    if (isNullOrUndefined(value) || value == '')
      return '/assets/loader/loading.gif';
    else if ((<string>value).includes('blob://')||(<string>value).includes('data:image'))
      return value;
    else
      return url + value;
  }

}
