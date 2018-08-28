import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeachingProgramContainerService} from '../../../../../../shared/service/teaching-program-container.service';
import {ActivatedRoute} from '@angular/router';
import {TeachingProgramContainer} from '../../../../../../shared/models/teaching-program-container';
import {TeachingProgram} from '../../../../../../shared/models/teaching-program';
import {TeachingProgramService} from '../../../../../../shared/service/teaching-program.service';
import {isNullOrUndefined} from 'util';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {User} from '../../../../../../shared/models/user';
import {MetaRxService} from '../../../../../../shared/service/meta-rx/meta-rx.service';

@Component({
  selector: 'app-teaching-program-one',
  templateUrl: './teaching-program-one.component.html',
  styleUrls: ['./teaching-program-one.component.css'],
  providers: [TeachingProgramContainerService, TeachingProgramService]
})
export class TeachingProgramOneComponent implements OnInit, OnDestroy {
  teachingPrograms: TeachingProgram [] = [];
  teachingProgramContainer: TeachingProgramContainer = new TeachingProgramContainer();
  user: User= new User();

  constructor(private _route: ActivatedRoute, private _teachingProgramContainerService: TeachingProgramContainerService, private _teachingProgramService: TeachingProgramService,private _user: UserDetailsService, private meta:MetaRxService) {
    this._route.params.subscribe(next => {
      this._teachingProgramService.findAllByContainerId(next['id']).subscribe(next => {
        if (isNullOrUndefined(next))
          this.teachingPrograms = [];
        else{
          this.teachingPrograms = next;
          let programs:string='';
          this.teachingPrograms.forEach((next,key)=>{
            if(programs.length<=174)
               programs+=next.name+'\n';
          });
          let one:any =[{ name: 'description', content: programs}];
          this.meta.updateMeta(one);
        }
      }, error => {
        console.log(error);
      });
      this._teachingProgramContainerService.findOneAvailable(next['id']).subscribe(next => {
        if(isNullOrUndefined(next))
          this.teachingProgramContainer= new TeachingProgramContainer();
          else {
          this.teachingProgramContainer = next;
          let one =[{ name: 'keywords', content: this.teachingProgramContainer.name}];
          this.meta.updateMeta(one);
          this.meta.updateTitle(this.teachingProgramContainer.name);
        }
      }, error => {
        console.log(error);
      });
    });
    this.user=this._user.user;
    this._user.getUser().subscribe(next=>{
      this.user=next;
    })
  }

  ngOnDestroy(): void {
    this.meta.setDefaultAll();
  }


  deletes(one: TeachingProgram){
    one.available=false;




    this._teachingProgramService.delete(one.id).subscribe(next=>{
      this.teachingPrograms.splice(this.teachingPrograms.indexOf(one),1);
    },error => {
      console.log(error);
    })
  }

  ngOnInit() {
  }

}
