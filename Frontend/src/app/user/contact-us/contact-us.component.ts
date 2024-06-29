import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})

export class ContactUsComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  submitForm() {
    const url = 'http://localhost:8000/api/user/send-email'; 
    this.http.post(url, this.formData)
      .subscribe(
        response => {
          console.log('Email sent successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Email sent successfully',
          });
          this.resetForm();

        },
        error => {
          console.error('Error sending email', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to send email',
            footer: 'Please try again later'
          });
        }
      );
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
  }
}