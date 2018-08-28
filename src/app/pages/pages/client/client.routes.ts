import {Routes} from '@angular/router';
import {HomeComponent} from './client/home/home.component';
import {ForumComponent} from './client/forum/forum.component';
import {ClientComponent} from './client/client.component';
import {ArtickleOneComponent} from './client/home/artickle-one/artickle-one.component';
import {EducationLawComponent} from './client/education-law/education-law.component';
import {ArticleContainerComponent} from './client/home/artickle-container/artickle-container.component';
import {ForumSectionComponent} from './client/forum/forum-section-wrapper/forum-section/forum-section.component';
import {ForumTopicComponent} from './client/forum/forum-section-wrapper/forum-topic/forum-topic.component';
import {SignUpComponent} from './client/sign-up/sign-up.component';
import {TeachersOfUkraineComponent} from './client/teachers-of-ukraine/teachers-of-ukraine.component';
import {AddForumComponent} from './client/forum/add-forum/add-forum.component';
import {SignInComponent} from './client/sign-in/sign-in.component';
import {UserCanActive} from '../../../shared/service/can-active/utils/forum-section.can-active';
import {MyProfileComponent} from './client/my-profile/my-profile.component';
import {UserProfileComponent} from './client/user-profile/user-profile.component';
import {TeachingProgramsComponent} from './client/teaching-programs/teching-programs.component';
import {TeachingProgramsWrapperComponent} from './client/teaching-programs/teaching-programs-wrapper/teaching-programs-wrapper.component';
import {TeachingProgramOneComponent} from './client/teaching-programs/teaching-program-one/teaching-program-one.component';
import {ForumWrapperComponent} from './client/forum/forum-wrapper/forum-wrapper.component';
import {ForumSectionWrapperComponent} from './client/forum/forum-section-wrapper/forum-section-wrapper.component';
import {CoursesComponent} from './client/courses/courses.component';
import {CourseContainerComponent} from './client/courses/course-container/course-container.component';
import {CourseOneComponent} from './client/courses/course-one/course-one.component';
import {RestorePasswordComponent} from './client/restore-password/restore-password.component';
import {RestorePasswordContainerComponent} from './client/restore-password/restore-password-container/restore-password-container.component';
import {ChangeComponent} from './client/restore-password/change/change.component';
import {ChatComponent} from './client/chat/chat.component';
import {ChatRoomComponent} from './client/chat/chat-room/chat-room.component';
import {Error404Component} from './client/error-404/error-404.component';
import {AboutUsComponent} from './client/about-us/about-us.component';

export const clientRoutes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {
        path: '', component: HomeComponent, children: [
          {
            path: '', component: ArticleContainerComponent
          }
        ]
      },
      {
        path: 'forum', component: ForumComponent, children: [
          {
            path: '', component: ForumWrapperComponent
          },
          {
            path: ':id', component: ForumSectionWrapperComponent, canActivate: [UserCanActive], children: [
              {
                path: '', component: ForumSectionComponent
              },
              {
                path: 'topic/:id', component: ForumTopicComponent
              }
            ]
          }
        ]
      },
      {
        path: 'add-forum', component: AddForumComponent
      },
      {
        path: 'article/one/:id', component: ArtickleOneComponent
      },
      {
        path: 'law', component: EducationLawComponent
      },
      {
        path: 'sign-up', component: SignUpComponent
      },
      {
        path: 'teachers-of-ukraine', component: TeachersOfUkraineComponent
      },
      {
        path: 'about-us', component: AboutUsComponent
      },
      {
        path: 'sign-in', children: [
          {path: '', component: SignInComponent},
          {path: ':password/:username', component: SignInComponent}
        ]
      },

      {
        path: 'my-profile', canActivate: [UserCanActive], component: MyProfileComponent
      },
      {
        path: 'user-profile/:id', canActivate: [UserCanActive], component: UserProfileComponent
      },
      {
        path: 'teaching-program', component: TeachingProgramsComponent, children: [
          {
            path: '', component: TeachingProgramsWrapperComponent
          },
          {
            path: 'one/:id', component: TeachingProgramOneComponent
          }
        ]
      },
      {
        path: 'courses', component: CoursesComponent, children: [
          {
            path: '', component: CourseContainerComponent
          },
          {
            path: 'one/:id', component: CourseOneComponent
          }
        ]
      },
      {
        path: 'restore-password', component: RestorePasswordComponent, children: [
          {
            path: '', component: RestorePasswordContainerComponent
          },
          {
            path: 'change/:uuid', component: ChangeComponent
          }
        ]
      },
      {
        path: 'chat', component: ChatComponent, canActivate: [UserCanActive], children: [
          {
            path: '', component: ChatRoomComponent
          },
          {
            path: 'room/:id', component: ChatRoomComponent
          }
        ]
      },
      {
        path: 'error/404', component: Error404Component
      }
    ]
  },
];
