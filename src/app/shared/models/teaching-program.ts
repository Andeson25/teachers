import {File} from "./file";
import {TeachingProgramContainer} from "./teaching-program-container";

export class TeachingProgram {
  id: number;
  name: string;
  file: File;
  container: TeachingProgramContainer;
  available: boolean = true;
}
