import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  userInfoUrl =  '../assets/json/userinfo.json';

  constructor(private http: HttpClient) { }

  getUserDetails(email: string): Observable<any> {
    return this.http.get(this.userInfoUrl);
  }

}
