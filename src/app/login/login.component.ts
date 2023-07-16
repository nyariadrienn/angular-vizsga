import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Loginmodel } from '../loginmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  lm: Loginmodel = new Loginmodel();
  isError: boolean = false;
  constructor(public auth: AuthService, private router: Router){

  }

  login(){
    this.auth.loginAsync(this.lm)
    .catch(t => {
      this.isError = true;
    })
    .then(t => {
      if (!this.isError){
        this.router.navigate(['dashboard']);
      }
    })
  }
}
