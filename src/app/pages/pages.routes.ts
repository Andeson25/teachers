import {clientRoutes} from "./pages/client/client.routes";
import {Routes} from "@angular/router";
import {cabinetRoutes} from "./pages/cabinet/cabinet.routes";
import {AppComponent} from "./pages/app.component";

export const pagesRoutes: Routes = [
  {
    path: '', component: AppComponent, children: [
      ...clientRoutes,
      ...cabinetRoutes
    ]
  }
];
