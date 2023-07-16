import { Component } from '@angular/core';
import { JobprofileService } from '../jobprofile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Jobprofile } from '../jobprofile';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  actual : Jobprofile = new Jobprofile();
  constructor(public service: JobprofileService, private router: Router, private auth: AuthService, private route: ActivatedRoute){
    if (!auth.isLoggedIn()){
      router.navigate(['login']);
    }
    route.params.subscribe(t => {
      this.actual = this.service.findJobProfileById(t['id']) as Jobprofile;
    })
  }

  save(){
    this.service.editAsync(this.actual).catch(t => {
      alert('Data error');
    }).then(t => {
      this.router.navigate(['dashboard']);
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
