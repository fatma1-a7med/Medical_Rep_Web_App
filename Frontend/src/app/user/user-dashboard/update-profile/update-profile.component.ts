import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { onlyLettersValidator, alphanumericValidator, emailFormatValidator, numericValidator } from './custom-validators'; // Import custom validators

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-profile.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./update-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.updateProfileForm = this.fb.group({
      first_name: ['', [Validators.required, onlyLettersValidator()]],
      last_name: ['', [Validators.required, onlyLettersValidator()]],
      email: ['', [Validators.required, Validators.email, emailFormatValidator()]],
      phone_number: ['', [Validators.required, numericValidator()]],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      territory: ['', [Validators.required, onlyLettersValidator()]],
      city: ['', [Validators.required, onlyLettersValidator()]],
      state: ['', [Validators.required, onlyLettersValidator()]],
      street: ['', [Validators.required, alphanumericValidator()]],
      image: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(
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
      this.selectedFile = event.target.files[0];
      this.updateProfileForm.patchValue({ image: this.selectedFile });
    }
  }

  onSubmit(): void {
    if (this.updateProfileForm.valid) {
      if (!this.selectedFile) {
        this.errorMessage = 'The image is required';
        return;
      }

      const formData = new FormData();
      Object.keys(this.updateProfileForm.value).forEach(key => {
        if (key === 'image') {
          formData.append(key, this.selectedFile as File);
        } else {
          formData.append(key, this.updateProfileForm.value[key]);
        }
      });

      // Log the formData content
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      this.userService.updateUserProfile(formData).subscribe(
        response => {
          this.messageService.showMessage('Profile updated successfully');
          this.router.navigate(['/user/user-profile']);
        },
        error => {
          console.error('Error updating user profile:', error);
          if (error.status === 400) {
            this.errorMessage = 'Bad request. Please check the input values.';
          } else {
            this.errorMessage = 'An error occurred';
          }
        }
      );
    }
  }
}
