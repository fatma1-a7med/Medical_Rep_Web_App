import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { first } from 'rxjs';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet, LoginComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: any = {};
  userForm : FormGroup;
  isFormSubmitted: boolean = false;

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      last_name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone_number: new FormControl("", [Validators.required, Validators.pattern(/^\d{11}$/)]),
      state: new FormControl("", [Validators.required, Validators.minLength(4)]),
      territory: new FormControl("", [Validators.required, Validators.minLength(4)]),
      city: new FormControl("", [Validators.required, Validators.minLength(4)]),
      street: new FormControl("", [Validators.required, Validators.minLength(4)]),
      password: new FormControl("", [Validators.required, Validators.minLength(3)])
    });
  }



  onSubmit() {
    const isFormValid = this.userForm.valid;
    this.isFormSubmitted =  true;
    console.log(this.userForm.value);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.user.image = file;
    }
  }


}
