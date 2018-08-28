import {Course} from './course';

export class CoursePageableWrapper{
  courses: Course[]=[];
  currentPage: number;
  numberOfPages: number;
  numberOfItems: number;
}
