import {ForumTopic} from "./forum-topic";
import {ForumSectionContainer} from "./forum-section-container";

export class ForumSection {
  id: number;
  header: string;
  description: string;
  forumTopics: ForumTopic[] = [];
  container: ForumSectionContainer;
  available: boolean = true;
}
