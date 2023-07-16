import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loginmodel } from './loginmodel';
import { Tokenmodel } from './tokenmodel';
import { Registermodel } from './registermodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'https://apiexample.andraskovacs.com/auth';
  users: Registermodel[] = [];

  constructor(private http: HttpClient) {
    this.getAllUserAsync().then(t => {
      this.users = t;
    })
  }

  loginAsync(lm: Loginmodel){
    return new Promise<void>((resolve, reject) => {
      this.http.post<Tokenmodel>(this.url, lm).subscribe(t => {
        localStorage.setItem('username', lm.username);
        localStorage.setItem('token', t.token);
        localStorage.setItem('expiration', t.expiration);
        resolve();
      }, error =>{
        reject();
      });
    })
  }

  registerAsync(rm: Registermodel){
    return new Promise<void>((resolve, reject) => {
      this.http.put(this.url, rm).subscribe(t => {
        resolve();
      }, error =>{
        reject();
      });
    })
  }

  getAllUserAsync(){
    return new Promise<Registermodel[]>((resolve, reject) => {
      this.http.get<Registermodel[]>(this.url).subscribe(t => {
        resolve(t);
      }, error =>{
        reject();
      });
    })
  }

  async getMyUserId(){
    let users = await this.getAllUserAsync();
    let me = users.find(t => t.userName == localStorage.getItem('username'));
    if (me != undefined){
      return me.id;
    }
    else{
      return '';
    }
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }

  logout(){
    localStorage.clear();
  }
}
