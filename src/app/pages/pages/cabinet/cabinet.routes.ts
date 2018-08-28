import {Routes} from '@angular/router';
import {CabinetComponent} from './cabinet/cabinet.component';
import {addRoutes} from './cabinet/add/add.routes';
import {updateRoutes} from './cabinet/update/update.routes';
import {AdminCanActive} from '../../../shared/service/can-active/utils/admin.can-active';
import {CheckUsersComponent} from './cabinet/check/check-users/check-users.component';

export const cabinetRoutes: Routes = [
  {
    path: 'cabinet', component: CabinetComponent, canActivate: [AdminCanActive], children: [
    ...updateRoutes,
    ...addRoutes,
      {
       path:'check',component: CheckUsersComponent
      }
  ]
  }
];
