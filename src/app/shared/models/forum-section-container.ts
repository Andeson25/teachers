import {ForumSection} from "./forum-section";

export class ForumSectionContainer {
  id: number;
  header: string;
  sections: ForumSection[] = [];
  available: boolean = true;
}
