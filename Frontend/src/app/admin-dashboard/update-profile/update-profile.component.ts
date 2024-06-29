import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProfileService } from '../../services/admin-profile.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
import { onlyLettersValidator, alphanumericValidator, emailFormatValidator, numericValidator } from './custom-validators';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  emailError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminProfileService: AdminProfileService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.updateProfileForm = this.fb.group({
      first_name: ['', [Validators.required, onlyLettersValidator()]],
      last_name: ['', [Validators.required, onlyLettersValidator()]],
      email: ['', [Validators.required, Validators.email, emailFormatValidator()]],
      phone_number: ['', [Validators.required, numericValidator()]],
      territory: ['', [Validators.required, onlyLettersValidator()]],
      city: ['', [Validators.required, onlyLettersValidator()]],
      state: ['', [Validators.required, onlyLettersValidator()]],
      street: ['', [Validators.required, alphanumericValidator()]],
      image: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAdminProfile();
  }

  loadAdminProfile(): void {
    this.adminProfileService.getAdminProfile().subscribe(
      response => {
        if (response) {
          this.updateProfileForm.patchValue(response);
        }
      },
      error => {
        console.error('Error loading user profile:', error);
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    this.emailError = false;
    if (this.updateProfileForm.valid) {
      if (!this.selectedFile) {
        this.errorMessage = 'The image is required';
        return;
      }

      const formData = new FormData();
      Object.keys(this.updateProfileForm.value).forEach(key => {
        formData.append(key, this.updateProfileForm.value[key]);
      });
      formData.append('image', this.selectedFile);

      this.adminProfileService.updateAdminProfile(formData).subscribe(
        response => {
          this.messageService.showMessage('Profile updated successfully');
          this.router.navigate(['/admin-dashboard/admin-profile']);
        },
        error => {
          if (error.status === 400) {
            this.emailError = true;
          } else {
            this.errorMessage = 'An error occurred';
          }
        }
      );
    }
  }
}
