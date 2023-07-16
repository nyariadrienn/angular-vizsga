import { Component } from '@angular/core';
import { JobprofileService } from '../jobprofile.service';
import { Jobprofile } from '../jobprofile';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  actual : Jobprofile = new Jobprofile();
  constructor(public service: JobprofileService, private router: Router, private auth: AuthService){
    if (!auth.isLoggedIn()){
      router.navigate(['login']);
    }
  }

  add(){
    this.service.addAsync(this.actual).catch(t => {
      alert('You are not logged in!');
    }).then(t => {
      this.router.navigate(['list']);
    });
    
  }

  upload(event: any){
    let file : File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e:any) => {
      let input = (e.target.result as string).replaceAll(':', ';').replaceAll(',', ';');
      let pieces = input.split(';')
      this.actual.photoContentType = pieces[1];
      this.actual.photoData = pieces[3];
    };
    reader.readAsDataURL(file);
  }
}
