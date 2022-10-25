import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  @ViewChild('errorDialog', { static: true })
  errorDialog!: TemplateRef<any>;

  constructor(private router: Router, private authenticationService: AuthenticationService, private dialog: MatDialog) {
    if (this.authenticationService.loggedIn) {  
      this.router.navigate(['home']);  
    } 
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email Required';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login() {
    // console.log(this.username, this.password)
    if(!!this.email.value && this.email.valid && !!this.password.value) {
      if (this.authenticationService.login(this.email.value, this.password.value)) {
        localStorage.setItem('user', this.email.value);
        this.router.navigate(['/app/dashboard']);
      } else {
        this.dialog.open(this.errorDialog, {
          width: '500px'
        });
      }
      
    }
  }

}
