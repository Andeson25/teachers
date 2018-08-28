import {Provider} from '@angular/core';
import {UserCanActive} from './utils/forum-section.can-active';
import {AdminCanActive} from './utils/admin.can-active';

export const CanActiveProvider: Provider[] = [
  UserCanActive,
  AdminCanActive
];


