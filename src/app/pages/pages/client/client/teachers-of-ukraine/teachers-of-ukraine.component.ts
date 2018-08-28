import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SpecializationService} from '../../../../../shared/service/specialization.service';
import {Specialization} from '../../../../../shared/models/specialization';
import {UserService} from '../../../../../shared/service/user.service';
import {User} from '../../../../../shared/models/user';
import {PlaceOfWorkService} from '../../../../../shared/service/place-of-work.service';
import {PlaceOfWork} from '../../../../../shared/models/place-of-work';
import {isNullOrUndefined} from 'util';
import {UserDetailsService} from '../../../../../shared/service/user-details-service';
import {UserPageableWrapper} from '../../../../../shared/models/user-pageable-wrapper';

@Component({
  selector: 'app-teachers-of-ukraine',
  templateUrl: './teachers-of-ukraine.component.html',
  styleUrls: ['./teachers-of-ukraine.component.css'],
  providers: [SpecializationService, UserService, PlaceOfWorkService]
})
export class TeachersOfUkraineComponent implements OnInit, AfterViewInit {
  subjectShow = false;
  specializations: Specialization[] = [];
  placeOfWorks: PlaceOfWork[] = [];
  usersWrapper: UserPageableWrapper = new UserPageableWrapper();
  users: User[] = [];
  allUsers: User [] = [];
  @ViewChild('filterText') filterSpec: ElementRef;
  @ViewChild('arrowImg') arrow: ElementRef;
  @ViewChild('placeOfWorkInputStr') filterPlaceOfWork: ElementRef;
  placeOfWorkInputStr: string;
  spec: Specialization = new Specialization('');
  user: User = new User();
  isAuth: boolean = false;

  currentPage: number = 1;
  numberOfAllPages: number;

  bool = true;

  backBool: boolean;


  constructor(private _userDetailsService: UserDetailsService, private _specializationService: SpecializationService, private _userService: UserService, private _placeOfWorkService: PlaceOfWorkService) {
    this._specializationService.findAllAvailable().subscribe(next => {
      this.specializations = next;
    }, error => {
      console.log(error);
    });
    this._userService.findAllPageableFiltering('Предмет', '', this.currentPage-1, 6).subscribe(next => {
      this.users = next.users;
      this.currentPage=next.currentPage+1;
      this.backBool=this.currentPage==1;
      this.numberOfAllPages=next.numberOfPages;
      console.log('current page= '+ next.currentPage);
      console.log('pages = '+ next.numberOfPages);
    });
    // this._userService.findAllPageable(0, 6).subscribe(next => {
    //   if (next.length<6) {
    //     this.bool = false;
    //   } else
    //     this.bool = true;
    //   if (next.length != 0)
    //     this.users = next;
    // }, error => {
    //   console.log(error);
    // });
    this.backBool = this.currentPage == 1;
    this._placeOfWorkService.findAll().subscribe(next => {
      this.placeOfWorks = next;
    }, error => {
      console.log(error);
    });
    this.isAuth = _userDetailsService.isAuth;
    this.user = _userDetailsService.user;
    _userDetailsService.checkAuthStorage().subscribe(next => {
      this.isAuth = next;
    });
    _userDetailsService.getUser().subscribe(next => {
      this.user = next;
    });
  }

  loadPage(zsuv: number) {
      this._userService.findAllPageableFiltering(this.filterSpec.nativeElement.innerHTML,this.filterPlaceOfWork.nativeElement.value, zsuv-1, 6).subscribe(next => {
        this.users = next.users;
        console.log(next);
        this.currentPage=next.currentPage+1;
        this.backBool=this.currentPage==1;
        this.numberOfAllPages=next.numberOfPages;
      });
  }

  prePage() {
    this.loadPage(this.currentPage-1);
  }

  nextPage() {
    this.loadPage(this.currentPage+1);
  }

  disableFilter() {
    this.filterSpec.nativeElement.innerHTML = 'Предмет';
    if (!isNullOrUndefined(this.placeOfWorkInputStr)) {
      // this.users = this.allUsers.filter(user => user.placeOfWork.name.includes(this.placeOfWorkInputStr));
    }
    else {
      // this.users = this.allUsers;
    }
  }

  filterUsersPlaceOfWork(specialization: HTMLHeadingElement, placeOfWorkInput: string) {
    this._userService.findAllPageableFiltering(specialization.innerHTML,placeOfWorkInput,0, 6).subscribe(next => {
      this.users = next.users;
      this.currentPage=next.currentPage+1;
      this.backBool=this.currentPage==1;
      this.numberOfAllPages=next.numberOfPages;
    });
  }

  filterUsersSpecialization(specialization: string, input: string, heading: HTMLHeadingElement) {
    heading.innerHTML = specialization;
    this._userService.findAllPageableFiltering(specialization,input,0, 6).subscribe(next => {
      this.users = next.users;
      this.currentPage=next.currentPage+1;
      this.backBool=this.currentPage==1;
      this.numberOfAllPages=next.numberOfPages;
    });
  }

  hide(subjects: HTMLDivElement) {
    subjects.style.display = 'none';
    this.arrow.nativeElement.style.transform = 'rotate(0deg)';
    this.subjectShow = false;
  }


  show(subjects: HTMLDivElement) {
    if (!this.subjectShow) {
      subjects.style.display = 'block';
      this.arrow.nativeElement.style.transform = 'rotate(180deg)';
      this.subjectShow = true;
    } else {
      subjects.style.display = 'none';
      this.arrow.nativeElement.style.transform = 'rotate(0deg)';
      this.subjectShow = false;
    }
  }

  delete(user: User) {
    this._userService.delete(user.id).subscribe(next=>{
      this.loadPage(this.users.length == 1 ? this.currentPage ==  1 ? this.currentPage : this.currentPage-1 : this.currentPage);
    },error => {
        console.log(error);
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }


}
