import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { UserinfoService } from 'src/app/services/userinfo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  courses: Array<any>;
  wishSalutation: string = 'Hi';
  user: string = '';

  constructor(private ngxService: NgxUiLoaderService, private userinfoService: UserinfoService) {
    this.courses = [
      {'courseId': 'CS101', 'courseName': 'Basics of Cyber Security', 'courseTime': '45m'},
      {'courseId': 'CS102', 'courseName': 'Deep dive into Security Features', 'courseTime': '45m'},
      {'courseId': 'CS103', 'courseName': 'Advanced Security', 'courseTime': '45m'},
      {'courseId': 'CS104', 'courseName': 'Security in Day-To-Day Life', 'courseTime': '45m'},
      {'courseId': 'CS105', 'courseName': 'More Resourses', 'courseTime': '45m'},
      {'courseId': 'CS106', 'courseName': 'Quizzes', 'courseTime': '45m'}
    ]
  }

  ngOnInit(): void {

    this.ngxService.start()

    this.wishSalutation = this.findWishingSalutation();

    this.ngxService.stop()

  }

  findWishingSalutation() {

    this.userinfoService.getUserDetails(localStorage.getItem('user') || '').subscribe(response => {
      let details = this.filterUser(response['data'], localStorage.getItem('user'));
      if(details.length > 0) {
        this.user = details[0].username;
      }
    })
    
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      return 'Good Morning';
    } else if (curHr < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  filterUser(response: any, username: any) {
    return response.filter((item: { [x: string]: string; }) => 
      item['email'] == username
    )
  }

}
