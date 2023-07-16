import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Registermodel } from '../registermodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  rm: Registermodel = new Registermodel();
  isError: boolean = false;
  constructor(public auth: AuthService, private router: Router){

  }

  register(){
    this.auth.registerAsync(this.rm)
    .catch(t => {
      this.isError = true;
    })
    .then(t => {
      if (!this.isError){
        this.router.navigate(['login']);
      }
    })
  }
}
