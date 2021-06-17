import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user-interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['status', 'username', 'email', 'edit'];

  constructor(private userService: UserService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUsersList().subscribe(res => {
      this.users = res.results;
    }, err => {
      console.error(err);

      this.snackbar.open('Unable to retrieve user list. Please refresh and try again.', '',
        { duration: 500, horizontalPosition: 'center', verticalPosition: 'top' });
    });
  }

}
