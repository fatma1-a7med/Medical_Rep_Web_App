import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JarwisService } from '../../services/jarwis.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string = '';
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: JarwisService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    console.log(this.token);
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { email, password, password_confirmation } = this.resetPasswordForm.value;
      this.authService.resetPassword(this.token, email, password, password_confirmation).subscribe(
        response => {
          this.message = 'Password reset successfully.';
        },
        error => {
          this.message = 'Error resetting password.';
          console.error(error);
        }
      );
    }
  }
}
