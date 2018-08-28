import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SupportService} from '../../../../../../shared/service/support.service';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [SupportService]
})
export class FooterComponent implements OnInit {
  showFooter: boolean = true;

  isAuth: boolean;

  constructor(private _supportService: SupportService, private _userDetailsService: UserDetailsService, private router: Router) {
    this.isAuth=_userDetailsService.isAuth;
    _userDetailsService.checkAuthStorage().subscribe(next=>{
      this.isAuth=next;
    });
    if (this.router.url.includes('chat'))
      this.showFooter = false;
    else
      this.showFooter = true;
    this.router.events.subscribe(() => {
      if (this.router.url.includes('chat'))
        this.showFooter = false;
      else
        this.showFooter = true;
    });
  }

  sendCallBack(text: HTMLTextAreaElement) {
    if(text.value != '' && text.value != ' ') {
      this._supportService.sendCallBack(text.value).subscribe(next => {
        text.value = '';
      }, error => {
        console.error(error);
      });
    } else {
      alert("Введіть текст повідомлення.");
    }
  }



  ngOnInit() {

  }

}
