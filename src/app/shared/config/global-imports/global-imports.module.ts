import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipeModule} from "../../pipe/pipe.module";
import {CommonModule} from "@angular/common";
import {ScrollToModule} from "ng2-scroll-to";
import {HttpClientModule} from "@angular/common/http";
import { TextMaskModule } from 'angular2-text-mask';
import {EmojiPickerModule} from 'ng-emoji-picker';
import {RouterModule, Routes} from '@angular/router';
import {pagesRoutes} from '../../../pages/pages.routes';

const _routes: Routes = [
  ...pagesRoutes
];


@NgModule({
  imports: [
    ScrollToModule.forRoot(),
    RouterModule.forRoot(_routes, {useHash: true}),
  ],
  exports: [
    EmojiPickerModule,
    TextMaskModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    PipeModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GlobalImportsModule {
}

