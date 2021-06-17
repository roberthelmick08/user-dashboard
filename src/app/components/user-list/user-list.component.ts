import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsersList().subscribe(res => {
      this.users = res.results;
    }, err => {
      console.error(err);
      
      // TODO: error handling
    });
  }

}
