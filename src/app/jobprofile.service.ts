import { Injectable } from '@angular/core';
import { Jobprofile } from './jobprofile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobprofileService {

  jobs: Jobprofile[] = [];
  userJobs : JobprofileService[] = [];
  url: string = 'https://apiexample.andraskovacs.com/jobProfile';
  constructor(private http: HttpClient, private auth: AuthService) { 

  }

  getAllAsync(){
    return new Promise<Jobprofile[]>((resolve, reject) => {
      this.http.get<Jobprofile[]>(this.url).subscribe(t => {
        this.jobs = t;
        resolve(t);
      });
    })
  }

  findJobProfileById(id: string){
    return this.jobs.find(t => t.id == id);
  }

  getUserJobProfileAsync(){
    return new Promise<void>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      this.http.patch<Jobprofile[]>(this.url, null, {headers: headers}).subscribe(t => {
        this.jobs = t;
        resolve();
      }, error =>{
        reject();
      });
    })
  }

  getUserJobProfileAsync2(){
    return new Promise<void>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      this.http.get<Jobprofile[]>(this.url).subscribe(async t => {
        this.jobs = this.userFilter(t, await this.auth.getMyUserId());
        resolve();
      }, error =>{
        reject();
      });
    })
  }

  userFilter(JobProfile: Jobprofile[], userid: string){
    return this.jobs.filter(t => t.ownerId == userid);
  }

  addAsync(f: Jobprofile){
    return new Promise<void>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      this.http.post(this.url, f, {headers: headers}).subscribe(t => {
        resolve();
      }, error =>{
        reject();
      });
    })
  }

  deleteAsync(id: string){
    return new Promise<void>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      this.http.delete(this.url + '/' + id, {headers: headers}).subscribe(t => {
        resolve();
      }, error =>{
        reject();
      });
    })
  }

  editAsync(f: Jobprofile){
    return new Promise<void>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      this.http.put(this.url, f, {headers: headers}).subscribe(t => {
        resolve();
      }, error =>{
        reject();
      });
    })
  }
}
