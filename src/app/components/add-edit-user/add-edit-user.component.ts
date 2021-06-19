import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  userId: string | null = null;   // using as flag for whether edit or create user
  isLoading = true;
  form: FormGroup;

  constructor(public dialog: MatDialog, private router: Router, private snackbar: MatSnackBar,
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private userService: UserService) {
    this.userId = this.route.snapshot.paramMap.get('uid');

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9 \'\-]+$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(res => {

        this.form.patchValue({
          username: res.username,
          email: res.email,
        });

      }, err => {
        console.error(err);

        this.snackbar.open('Unable to retrieve user. Please refresh and try again.', '',
          { duration: 500, horizontalPosition: 'center', verticalPosition: 'top' });
      }, () => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.userId) {
      this.userService.updateUser(this.userId, this.form.value).subscribe(res => {
        this.router.navigate(['/']);

        this.snackbar.open('User ' + this.form.controls.username.value + ' successfully updated!', '',
          { duration: 500, horizontalPosition: 'center', verticalPosition: 'top' });

      }, err => {
        console.error(err);

        this.snackbar.open('Unable to update user. Please refresh and try again.', '',
          { duration: 500, horizontalPosition: 'center', verticalPosition: 'top' });
      });
    } else {
      this.userService.createUser(this.form.value).subscribe(res => {
        this.router.navigate(['/']);

        this.snackbar.open('User ' + this.form.controls.username.value + ' successfully created!', '',
          { duration: 500, horizontalPosition: 'center', verticalPosition: 'top' });

      }, err => {
        console.error(err);

        this.snackbar.open('Unable to create user. Please refresh and try again.', '',
          { duration: 500, horizontalPosition: 'center', verticalPosition: 'top' });
      });
    }
  }

  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Are you sure?', message: 'Going back will make you lose any progress.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Are you sure you want to delete this user?', message: 'You will not be able to reverse this action.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(this.userId || '').subscribe(res => {
          this.router.navigate(['/']);

          this.snackbar.open('Successfully deleted user!', '',
            { duration: 500, horizontalPosition: 'center', verticalPosition: 'top' });

        }, err => {
          console.error(err);

          this.snackbar.open('Unable to delete user. Please refresh and try again.', '',
            { duration: 500, horizontalPosition: 'center', verticalPosition: 'top' });
        });
      }
    });
  }
}