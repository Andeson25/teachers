import {User} from "./user";

export class Specialization {
  id: number;
  name: string;
  users: User[] = [];
  available: boolean = true;

  constructor(val?: string) {
    this.name = val;
  }
}
