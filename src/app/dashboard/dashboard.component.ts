import { Component } from '@angular/core';
import { JobprofileService } from '../jobprofile.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public service: JobprofileService, private router: Router, private auth: AuthService){
    if (!auth.isLoggedIn()){
      router.navigate(['login']);
    }
    service.getUserJobProfileAsync();
  }

  delete(id: string){
    this.service.deleteAsync(id).then(t => {
      this.service.getUserJobProfileAsync();
    });
  }
}
