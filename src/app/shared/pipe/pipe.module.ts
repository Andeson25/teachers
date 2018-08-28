import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocalDateTimeToDate} from './utils/local-date-time-to-date';
import {ImagePipe} from './utils/image.pipe';
import {NullOrUndefinedPipe} from './utils/null-or-undefined.pipe';

@NgModule({
  declarations: [
    LocalDateTimeToDate,
    ImagePipe,
    NullOrUndefinedPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocalDateTimeToDate,
    ImagePipe,
    NullOrUndefinedPipe
  ]
})
export class PipeModule {

}
