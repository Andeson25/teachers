import {Routes} from '@angular/router';
import {AddArticleComponent} from './add/add-article/add-article.component';
import {AddForumTopicComponent} from './add/add-forum-topic/add-forum-topic.component';
import {AddCourseComponent} from './add/add-course/add-course.component';
import {AddComponent} from './add/add.component';
import {AddTeachingProgramComponent} from './add/add-teaching-program/add-teaching-program.component';
import {AddLawComponent} from "./add/add-law/add-law.component";
import {AddForumSectionComponent} from "./add/add-forum-section/add-forum-section.component";
import {AddQuestionnaireComponent} from './add/add-questionnaire/add-questionnaire.component';

export const addRoutes: Routes = [
  {
    path: 'add', component: AddComponent, children: [
      {path: 'article', component: AddArticleComponent},
      {path: 'course', component: AddCourseComponent},
      {path: 'forum-topic', component: AddForumTopicComponent},
      {path: 'forum-section', component: AddForumSectionComponent},
      {path: 'questionnaire', component: AddQuestionnaireComponent},
      {path: 'teaching-program', component: AddTeachingProgramComponent},
    {path: 'law',component: AddLawComponent}
    ]
  }
];
