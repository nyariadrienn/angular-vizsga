import { Component } from '@angular/core';
import { JobprofileService } from '../jobprofile.service';
import { Jobprofile } from '../jobprofile';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  filterCity: string = '';
  filterSkills: string = "";
  filterIntroduction: string = "";
  filterPicture : boolean = false;
  filteredJobProfile: Jobprofile[] = [];
  
  constructor(public service: JobprofileService, public auth: AuthService){
    service.getAllAsync().then(t => {
      this.filteredJobProfile = t;
    })
  }

  getName(id: string){
    let user = this.auth.users.find(t => t.id == id);
    if (user != undefined){
      return user.firstName + ' ' + user.lastName + ' (' + user.email + ')';
    }
    else{
      return '';
    }
  }

  clear(){
    this.service.getAllAsync().then(t => {
      this.filteredJobProfile = t;
    })
  }

  filter(){
    this.filteredJobProfile = this.filteredJobProfile
      .filter(t => t.city >= this.filterCity)
      .filter(t => t.skills >= this.filterSkills)
      .filter(t => t.introduction >= this.filterIntroduction)
      .filter(t => {
        if (this.filterPicture){
          return t.photoContentType != null && t.photoContentType.length > 1;
        }
        else{
          return t;
        }
      });
  } 

}
