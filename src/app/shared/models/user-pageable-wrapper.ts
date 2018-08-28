import {User} from './user';

export class UserPageableWrapper{
  users: User[] = [];
  currentPage: number;
  numberOfPages: number;
  numberOfItems: number;
}
