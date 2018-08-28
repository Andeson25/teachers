import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserDetailsService} from '../../../../../shared/service/user-details-service';
import {User} from '../../../../../shared/models/user';
import {ImagePipe} from '../../../../../shared/pipe/utils/image.pipe';
import {FileService} from '../../../../../shared/service/file.service';
import {isNullOrUndefined} from 'util';
import {UserService} from '../../../../../shared/service/user.service';
import {Specialization} from '../../../../../shared/models/specialization';
import {File} from '../../../../../shared/models/file';
import {PlaceOfWork} from '../../../../../shared/models/place-of-work';
import {Config} from '../../../../../shared/config/config';

// import Spec = jasmine.Spec;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [FileService, UserService]
})
export class MyProfileComponent implements OnInit, AfterViewInit {
  isAuth: boolean = false;
  user: User = new User();
  editable: boolean = false;
  url: string = '';
  imagePipe = new ImagePipe();
  bigImageSrc: string = '';

  telPattern = Config.PHONE_MASK;

  constructor(private _userDetailsService: UserDetailsService, private _fileService: FileService, private _userService: UserService) {
    this.isAuth = _userDetailsService.isAuth;
    this.user = _userDetailsService.user;
    console.log(`user ${JSON.stringify(this.user)}`);
    this.checkPlaceOfWork();
    this._userDetailsService.$user.subscribe(next => {
      this.user = next;
      this.checkPlaceOfWork();
      console.log(`user from sub ${JSON.stringify(this.user)}`);
    });
    this._userDetailsService.checkAuthStorage().subscribe(next => {
      this.isAuth = next;
    });
    // this.url = this.imagePipe.transform(this.user.image);
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.user.image = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  translateIncumbency(incumbency: string) {
    return this._userDetailsService.incumbency[incumbency];
  }

  edit() {
    this.editable = !this.editable;
  }

  ngOnInit() {
    this._userDetailsService.getUser().subscribe(next => {
      this.user = next;
      // this.url = this.imagePipe.transform(next.image);
    });
  }

  // validate() {
  //   this.userForm = new FormGroup({
  //     name: new FormControl({disabled: !this.editable}, []),
  //     lastname: new FormControl({disabled: !this.editable}, []),
  //     surname: new FormControl({disabled: !this.editable}, []),
  //     placeOfWork: new FormGroup({
  //       name: new FormControl({disabled: !this.editable}, []),
  //     }),
  //     phone: new FormControl({disabled: !this.editable}, []),
  //     information: new FormControl({disabled: !this.editable}, [])
  //   });
  //   this.userForm.setValue({
  //     name: this.user.name,
  //     surname: this.user.surname,
  //     lastname: this.user.lastname,
  //     placeOfWork: {
  //       name: this.user.placeOfWork.name
  //     },
  //     information: this.user.information,
  //     phone: this.user.phone,
  //   });
  //   this.userForm.valueChanges.subscribe(next => {
  //     this.user = next;
  //   });
  // }

  addFoto(form: HTMLFormElement) {
    if (isNullOrUndefined(this.user.files)) {
      this.user.files = [];
    }

    this._fileService.saveUser(form).subscribe(next => {
      this.user.files.push(next);
    }, error => {
      console.log(error);
    }, () => {
      form.reset();
    });

  }

  deleteImg(id: number) {
    this._fileService.delete(id).subscribe(next => {
      this.user.files = this.user.files.filter(elem => elem.id != id);
    }, error => {
      console.log(error);
    });

  }

  editAndUpdate(form: HTMLFormElement) {
    this.editable = !this.editable;
    let userJson = JSON.stringify(this.user);
    console.log(userJson);
    this._userService.update(userJson, form).subscribe(next => {
      // console.log(JSON.parse(userJson));
      this.user = next;
      this.url=this.imagePipe.transform(next.image);
      this._userService.get().subscribe(next=>{
         this._userDetailsService.updateUser(next) ;
      });
    }, error => {
      console.error(error);
    }, () => {
    });
  }

  //
  addSpec(input: HTMLInputElement) {
    this.user.specializations.push(new Specialization(input.value));
    input.value = '';
  }

  // private getUserJSON() {
  //   this.user.id = this._userDetailsService.user.id;
  //   this.user.specializations = this._userDetailsService.user.specializations;
  //   this.user.incumbency = this._userDetailsService.user.incumbency;
  //   this.user.role = this._userDetailsService.user.role;
  //   this.user.files = this._userDetailsService.user.files;
  //   this.user.image = this._userDetailsService.user.image;
  //   this.jsonUser = JSON.stringify(this.user);
  // }

  // update(form: HTMLFormElement) {
  //   console.log('useoasmdsad');
  //   this._userService.update(this.jsonUser, form).subscribe(next => {
  //     console.log(next);
  //   }, error => {
  //     console.error(error);
  //   }, () => {
  //     if (localStorage.getItem('user'))
  //       this._userDetailsService.loginWithLocal(this.user);
  //     else
  //       this._userDetailsService.loginWithSession(this.user);
  //   });
  // }

  deleteSpec(index: number) {
    this.user.specializations.splice(index, 1);
    this._userDetailsService.user.specializations = this.user.specializations;
  }

  showFullSizeImg(image: File, modalContainer: HTMLDivElement) {
      // modalContainer.style.display = 'unset';
      this.bigImageSrc = this.imagePipe.transform(image.path);
  }

  closeFullSize(modalContainer: HTMLDivElement) {
    // modalContainer.style.display = 'none';

  }

  ngAfterViewInit(): void {

  }

  private checkPlaceOfWork() {
    if (!this.user.placeOfWork) {
      this.user.placeOfWork = new PlaceOfWork();
      this.user.placeOfWork.name = '';
    }
  }
}
