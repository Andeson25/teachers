
import {LawContainer} from "./law-container";

export class Law {
  id: number;
  datetime: string;
  name: string;
  path: string;
  available: boolean = true;
  container: LawContainer;
}
