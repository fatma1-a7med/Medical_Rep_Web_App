import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userForm : FormGroup;
  isFormSubmitted: boolean = false;
  constructor() {
    this.userForm = new FormGroup({
      email: new FormControl("",Validators.required),
      password: new FormControl("", Validators.required)
    });
  }



  onSubmit() {
    const isFormValid = this.userForm.valid;
    this.isFormSubmitted =  true;
    console.log(this.userForm.value);
  }


}
