import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HomeComponent} from './client/home/home.component';
import {GlobalImportsModule} from "../../../shared/config/global-imports/global-imports.module";
import {ForumComponent} from './client/forum/forum.component';
import {HeaderComponent} from "./client/source/header/header.component";
import {ClientComponent} from "./client/client.component";
import { PopularArticleComponent } from './client/home/artickle-container/popular-article/popular-article.component';
import { ArtickleContainerOne } from './client/home/artickle-container/artickle-container-one/artickle.component';
import { FooterComponent } from './client/source/footer/footer.component';
import { ArtickleOneComponent } from './client/home/artickle-one/artickle-one.component';
import { EducationLawComponent } from './client/education-law/education-law.component';
import { ArticleContainerComponent } from './client/home/artickle-container/artickle-container.component';
import { AdvertismentComponent } from './client/source/advertisment/advertisment.component';
import { ForumSectionContainerComponent } from './client/forum/forum-wrapper/forum-section-container/forum-section-container.component';
import {ForumSectionComponent} from './client/forum/forum-section-wrapper/forum-section/forum-section.component';
import { ForumTopicComponent } from './client/forum/forum-section-wrapper/forum-topic/forum-topic.component';
import { SignUpComponent } from './client/sign-up/sign-up.component';
import { TeachersOfUkraineComponent } from './client/teachers-of-ukraine/teachers-of-ukraine.component';
import {TeacherCardComponent} from './client/teachers-of-ukraine/teacher-card/teacher-card.component';
import { AddForumComponent } from './client/forum/add-forum/add-forum.component';
import { SignInComponent } from './client/sign-in/sign-in.component';
import { MyProfileComponent } from './client/my-profile/my-profile.component';
import { UserProfileComponent } from './client/user-profile/user-profile.component';
import {TeachingProgramsComponent} from './client/teaching-programs/teching-programs.component';
import {TeachingProgramsContainerComponent} from './client/teaching-programs/teaching-programs-wrapper/teaching-programs-container/teaching-programs-container.component';
import { TeachingProgramsWrapperComponent } from './client/teaching-programs/teaching-programs-wrapper/teaching-programs-wrapper.component';
import { TeachingProgramOneComponent } from './client/teaching-programs/teaching-program-one/teaching-program-one.component';
import { ForumWrapperComponent } from './client/forum/forum-wrapper/forum-wrapper.component';
import { ForumSectionWrapperComponent } from './client/forum/forum-section-wrapper/forum-section-wrapper.component';
import { CoursesComponent } from './client/courses/courses.component';
import { CourseCardComponent } from './client/courses/course-card/course-card.component';
import { CourseContainerComponent } from './client/courses/course-container/course-container.component';
import { CourseOneComponent } from './client/courses/course-one/course-one.component';
import { RestorePasswordComponent } from './client/restore-password/restore-password.component';
import { RestorePasswordContainerComponent } from './client/restore-password/restore-password-container/restore-password-container.component';
import { ChangeComponent } from './client/restore-password/change/change.component';
import { ChatComponent } from './client/chat/chat.component';
import { ChatRoomComponent } from './client/chat/chat-room/chat-room.component';
import { ChatContainerComponent } from './client/chat/chat-container/chat-container.component';
import { Error404Component } from './client/error-404/error-404.component';
import { AboutUsComponent } from './client/about-us/about-us.component';



@NgModule({
  imports: [
    GlobalImportsModule
  ],
  declarations: [
    ClientComponent,
    HomeComponent,
    ForumComponent,
    HeaderComponent,
    PopularArticleComponent,
    ArtickleContainerOne,
    FooterComponent,
    ArtickleOneComponent,
    EducationLawComponent,
    ArticleContainerComponent,
    AdvertismentComponent,
    ForumSectionContainerComponent,
    ForumSectionComponent,
    ForumTopicComponent,
    SignUpComponent,
    TeachersOfUkraineComponent,
    TeacherCardComponent,
    AddForumComponent,
    SignInComponent,
    TeachingProgramsComponent,
    TeachingProgramsContainerComponent,
    TeachingProgramsWrapperComponent,
    TeachingProgramOneComponent,
    MyProfileComponent,
    UserProfileComponent,
    ForumWrapperComponent,
    ForumSectionWrapperComponent,
    CoursesComponent,
    CourseCardComponent,
    CourseContainerComponent,
    CourseOneComponent,
    RestorePasswordComponent,
    RestorePasswordContainerComponent,
    ChangeComponent,
    ChatComponent,
    ChatRoomComponent,
    ChatContainerComponent,
    Error404Component,
    AboutUsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientModule {
}
