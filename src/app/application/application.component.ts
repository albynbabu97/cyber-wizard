import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @ViewChild('confirmDialog', { static: true })
  confirmDialog!: TemplateRef<any>;

  constructor(private router: Router, private authenticationService: AuthenticationService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  logout() {
    this.dialog.open(this.confirmDialog, {
      width: '500px'
    });
  }

  logoutConfirmed() {
    this.authenticationService.logout();  
    this.router.navigate(['/login']);
  }

}
