import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ClientModule} from "./pages/client/client.module";
import {AppComponent} from "./pages/app.component";
import {CabinetModule} from "./pages/cabinet/cabinet.module";
import {GlobalImportsModule} from "../shared/config/global-imports/global-imports.module";
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    GlobalImportsModule,
    ClientModule,
    CabinetModule
  ],
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {
}












