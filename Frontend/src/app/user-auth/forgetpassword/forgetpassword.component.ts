import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JarwisService } from '../../services/jarwis.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class forgetpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: JarwisService) {
    // Initialize the form group with an initial value for the email field
    this.forgotPasswordForm = this.fb.group({
      email: ['initial@example.com', [Validators.required, Validators.email]]  // Set your initial value here
    });
  }

  ngOnInit() {
    console.log('Component initialized');
    console.log(this.forgotPasswordForm);
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService.sendresetLink(this.forgotPasswordForm.value.email).subscribe(
        response => {
          Swal.fire({
            title: 'Success!',
            text: 'Reset link sent to your email successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Error sending reset link.',
            icon: 'error',
            confirmButtonText: 'OK'
          });        }
      );
    }
  }
}
