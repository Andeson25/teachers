import {File} from './file';
import {Specialization} from './specialization';
import {PlaceOfWork} from './place-of-work';

export class User {
  id: number;
  name: string;
  lastname: string;
  surname: string;
  email: string;
  phone: string;
  information: string;
  password: string;
  uuid: string;
  image: string;
  placeOfWork: PlaceOfWork;
  specializations: Specialization[] = [];
  incumbency: string;
  role: string;
  files: File[] = [];
  available: boolean = true;
  perevireno: boolean = false;
  facebookLink: string;
}
