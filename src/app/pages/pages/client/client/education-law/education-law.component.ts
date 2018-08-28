import {Component, OnDestroy, OnInit} from '@angular/core';
import {LawContainerService} from '../../../../../shared/service/law-container.service';
import {LawContainer} from '../../../../../shared/models/law-container';
import {CommentService} from '../../../../../shared/service/comment.service';
import {Comment} from '../../../../../shared/models/comment';
import {isNullOrUndefined} from 'util';
import {LawService} from '../../../../../shared/service/law.service';
import {Law} from '../../../../../shared/models/law';
import {UserDetailsService} from '../../../../../shared/service/user-details-service';
import {User} from '../../../../../shared/models/user';
import {MetaRxService} from '../../../../../shared/service/meta-rx/meta-rx.service';

@Component({
  selector: 'app-education-law',
  templateUrl: './education-law.component.html',
  styleUrls: ['./education-law.component.css'],
  providers: [LawContainerService,LawService]
})
export class EducationLawComponent implements OnInit, OnDestroy {

  lawContainers: LawContainer[] = [];
  comemnts: Comment[] = [];
  user: User = new User();

  constructor(private _lawContainerService: LawContainerService, private _law: LawService, private _user: UserDetailsService, private meta: MetaRxService) {
    this._lawContainerService.findAllAvailable().subscribe(next => {
      if(isNullOrUndefined(next)){
        this.lawContainers = [];
      }else
      this.lawContainers = next;
      let content:string='';
      this.lawContainers.forEach(next=>{
        next.laws.forEach(next=>{
          if (content.length <= 174)
            content += next.name + '\n';
        })
      });
      let keywords= !isNullOrUndefined(this.lawContainers[0])?this.lawContainers[0].name:'';
      let one:any =[{ name: 'description', content: content}, { name: 'keywords', content: keywords}];
      this.meta.updateMeta(one);
      this.meta.updateTitle('Законодавство\n' +
        'У галузі науки та освіти');
    }, error => {
      console.log(error);
    });
    this.user=this._user.user;
    this._user.getUser().subscribe(next=>{
      this.user=next;
    })
  }

  ngOnDestroy(): void {
    this.meta.setDefaultAll();
  }


  deleteContainer(one: LawContainer){
    one.available=false;
    this._lawContainerService.update(one).subscribe(next=>{
        this.lawContainers.splice(this.lawContainers.indexOf(one),1);
    },error => {
        console.log(error);
    })
  }

  deleteLaw(one: LawContainer, two :Law){
    this._law.delete(two.id).subscribe(next=>{
     one.laws.splice(one.laws.indexOf(two),1);
    },error => {
        console.log(error);
    })
  }

  ngOnInit() {
  }

}
