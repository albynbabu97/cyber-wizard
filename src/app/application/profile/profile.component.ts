import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserinfoService } from 'src/app/services/userinfo.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from "ngx-ui-loader";

interface userDetails {
  email: string;
  username: string;
  registeredOn: string;
  badges: Array<string>;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('errorDialog', { static: true })
  errorDialog!: TemplateRef<any>;

  userinfo: userDetails = {
    email: '',
    username: '',
    registeredOn: '',
    badges: []
  };

  constructor(private userinfoService: UserinfoService, private dialog: MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {

    this.ngxService.start();

    this.userinfoService.getUserDetails(localStorage.getItem('user') || '').subscribe({next: (response) => {
      let details = this.filterUser(response['data'], localStorage.getItem('user'));
      if(details.length > 0) {
        this.userinfo = details[0];
        this.ngxService.stop();
      } else {
        this.ngxService.stop();
        this.dialog.open(this.errorDialog, {
          width: '500px'
        });
      }
    },
    error: (e) => {
      this.ngxService.stop();
      this.dialog.open(this.errorDialog, {
        width: '500px'
      });
    }})

  }

  filterUser(response: any, username: any) {
    return response.filter((item: { [x: string]: string; }) => 
      item['email'] == username
    )
  }

}
