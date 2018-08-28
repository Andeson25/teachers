import {TeachingProgram} from './teaching-program';

export class TeachingProgramContainer {
  id: number;
  name: string;
  programs:TeachingProgram[]=[];
  available: boolean = true;
}
