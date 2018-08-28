import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CabinetComponent} from "./cabinet/cabinet.component";
import {GlobalImportsModule} from "../../../shared/config/global-imports/global-imports.module";
import {AddComponent} from './cabinet/add/add/add.component';
import {AddModule} from "./cabinet/add/add.module";
import {UpdateModule} from './cabinet/update/update.module';
import { CheckUsersComponent } from './cabinet/check/check-users/check-users.component';
import { UserCardComponent } from './cabinet/check/check-users/user-card/user-card.component';

@NgModule({
  imports: [
    GlobalImportsModule,
    AddModule,
    UpdateModule,
  ],
  declarations: [
    CabinetComponent,
    CheckUsersComponent,
    UserCardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CabinetModule {
}
