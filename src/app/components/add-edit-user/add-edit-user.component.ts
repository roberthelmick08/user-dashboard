import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
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
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
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
      this.userService.updateUser(this.userId, this.form.value);
    } else {
      this.userService.createUser(this.form.value);
    }
  }

  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
    // TODO: launch confirmation modal
  }
}
