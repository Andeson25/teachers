import {Routes} from '@angular/router';
import {UpdateComponent} from './update/update.component';
import {CourseContainerComponent} from './update/course-container/course-container.component';
import {CourseComponent} from './update/course-container/course/course.component';
import {ForumSectionContainerComponent} from './update/forum-section-container/forum-section-container.component';
import {ForumSectionContainerOneComponent} from './update/forum-section-container/forum-section-container-one/forum-section-container-one.component';
import {ForumSectionOneComponent} from './update/forum-section-container/forum-section-container-one/forum-section/forum-section-one/forum-section-one.component';
import {LawContainerComponent} from './update/law-container/law-container/law-container.component';
import {LawContainerOneComponent} from './update/law-container/law-container-one/law-container-one.component';
import {ArticleContainerComponent} from './update/update-article/article-container/article-container.component';
import {ArticleOneComponent} from './update/update-article/article-one/article-one.component';
import {TeachingProgramContainerComponent} from "./update/teaching-program-container/teaching-program-container.component";
import {TeachingProgramContainerOneComponent} from "./update/teaching-program-container/teaching-program-container-one/teaching-program-container-one.component";
import {TeachingProgramComponent} from "./update/teaching-program-container/teaching-program-container-one/teaching-program/teaching-program.component";
import {UpdateLawComponent} from './update/law-container/update-law.component';

export const updateRoutes: Routes = [
  {
    path: 'update', component: UpdateComponent, children: [
      {
        path: 'article', children: [
          {path: '', component: ArticleContainerComponent},
          {path: 'one/:id', component: ArticleOneComponent}
        ]
      },
      {
        path: 'course', children: [
          {path: '', component: CourseContainerComponent},
          {path: ':id', component: CourseComponent}
        ]
      },
      {
        path: 'forum', children: [
          {
            path: '', component: ForumSectionContainerComponent
          },
          {
            path: ':id', component: ForumSectionContainerOneComponent
          },
          {
            path: 'section/:id', component: ForumSectionOneComponent
          },
        ]
      },
      {
        path: 'law', component: UpdateLawComponent, children: [
          {
            path: '', component: LawContainerComponent,
          },
          {
            path: ':law', component: LawContainerOneComponent
          }
        ]
      },
    {
        path: 'program', children: [
        {
            path: 'container', component: TeachingProgramContainerComponent
        },
        {
          path: 'container/:id', component: TeachingProgramContainerOneComponent
        },
        {
          path: ':id', component: TeachingProgramComponent
        },
        ]
      },
    ]
  }
];
