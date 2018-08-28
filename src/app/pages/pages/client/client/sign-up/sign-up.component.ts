import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../../shared/models/user';
import {UserService} from '../../../../../shared/service/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Config} from '../../../../../shared/config/config';
import {UserDetailsService} from '../../../../../shared/service/user-details-service';
import {Specialization} from '../../../../../shared/models/specialization';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {PlaceOfWorkService} from '../../../../../shared/service/place-of-work.service';
import {SpecializationService} from '../../../../../shared/service/specialization.service';
import {PlaceOfWork} from '../../../../../shared/models/place-of-work';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService, UserDetailsService, PlaceOfWorkService, SpecializationService]
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  userForm: FormGroup;
  telPattern = Config.PHONE_MASK;
  url: string = '';
  exists: boolean = false;
  photo: boolean = false;
  spec:boolean = false;
  facebook=false;

  placeOfWorks: PlaceOfWork[]=[];
  specializations: Specialization[]=[];

  @ViewChild('firstPass') firstPass: HTMLInputElement;
  @ViewChild('secondPass') secondPass: HTMLInputElement;
  @ViewChild('load') loadI: ElementRef;
  @ViewChild('facebookLink') facebookLink: ElementRef;
  @ViewChild('specInput') specInput: ElementRef;

  disabled = false;
  userJson: string;
  specializationStr: string[] = [];
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  constructor(private _route: Router,private _userService: UserService, private _userDetailService: UserDetailsService, private _placeOfWorkService: PlaceOfWorkService, private _specializationService : SpecializationService) {
    this._specializationService.findAll().subscribe(next=>{
      this.specializations=next;
    },error => {
        console.log(error);
    })
    this._placeOfWorkService.findAll().subscribe(next=>{
     this.placeOfWorks=next;
    },error => {
        console.log(error);
    })
  }



  addStr(input: HTMLInputElement) {
    if (!isNullOrUndefined(input.value)) {
      if (input.value.length != 0) {
        if (!/^\s+$/.test(input.value)) {
          this.specializationStr.push(input.value);
          input.value = '';
        }
      }
    }
  }

  createUser(form: HTMLFormElement) {
    // alert('Реєстрація на даний момент не можлива\nВедуться технічні роботи');
    if (this.firstPass.value == this.secondPass.value) {
      if (this.url.length != 0 && this.specializationStr.length != 0 || this.url.length != 0 && this.specInput.nativeElement.value != '' && this.specializationStr.length == 0) {
        if (this.specInput.nativeElement.value != '') {
          this.user.specializations.push(new Specialization(this.specInput.nativeElement.value));
        }
        this.loadI.nativeElement.style.display='inline-block';
        this.spec = false;
        this.disabled=true;
        this.photo=false;
        this.facebook=false;
        this.userJson = JSON.stringify(this.user);
        this._userService.save(form, this.userJson).subscribe(next => {
          console.log((JSON.parse(this.userJson)));
            console.log(JSON.stringify(next));
            if (this.userForm.valid) {
              alert('Підтвердіть ваш обліковий запис, підтвердження було відправлене на вашу електронну адресу ');
              this.loadI.nativeElement.style.display = 'none';
            }
          }, err => {
          this.disabled = false;
          this.photo = false;
          this.spec = false;
          this.facebook = false;
            console.log(err);
            this.loadI.nativeElement.style.display = 'none';
            if (err.messages = 'User already exists')
              this.exists = true;
          }, () => {
            this._route.navigateByUrl('/sign-in');
          }
        );
      }else{
        alert("Ви не заповнили всі дані");
        if (this.url.length == 0) {
          this.photo=true;
        }
        if (this.specInput.nativeElement.value == '' && this.specializationStr.length == 0) {
          this.spec = true;
        }
      }
    }
    else {
      alert('Паролі не співпадають');
    }
  }



  deleteStr(index:number) {
    console.log(index);
    this.specializationStr.splice(index,1);

  }

  validateAddUserForm() {

    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      specializations: new FormControl(),
      placeOfWork: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      }),
      incumbency: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [, Validators.minLength(12)]),
      facebookLink: new FormControl('', [Validators.pattern(/https:\/\/www\.facebook\.com\/\w+/), Validators.minLength(12)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gi)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.userForm.valueChanges.subscribe(next => {
      this.user = next;
      this.user.role = 'USER';
      let specializationArr: Specialization[] = this.specializationStr.map((val: string) => new Specialization(val));
      this.user.specializations = specializationArr;
      this.user.email=this.user.email.toLowerCase();
    });
  }


  ngOnInit() {
    this.validateAddUserForm();
  }

  change() {
    return true
  }

}
