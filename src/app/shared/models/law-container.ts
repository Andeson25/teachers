import {Law} from "./law";

export class LawContainer {
  id: number;
  name: string;
  laws: Law[] = [];
  available: boolean = true;
}
