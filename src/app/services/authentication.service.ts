import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  credentials = {};

  constructor() {
    this.credentials = environment.password;
  }

  login(username: string, password: string):boolean  {  
    if (environment.email.includes(username) && this.credentials[username as keyof {}] == password) {  
      localStorage.setItem('currentUser', "loggedin");
      return true;  
    }  
    return false;
  }

  logout() {  
    localStorage.removeItem('currentUser');  
    localStorage.removeItem('user');
    localStorage.removeItem('details');
  }
    
  public get loggedIn(): boolean {  
    return (localStorage.getItem('currentUser') !== null);  
  }  

}