import {User} from './user';

export class File {
  id: number;
  name: string;
  path: string;
  type: string;
  available: boolean = true;
  user: User;

}
