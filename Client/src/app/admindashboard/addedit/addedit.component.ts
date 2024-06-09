import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,DateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';

import {MedicalrepService}  from '../../services/medicalrep.service'
@Component({
  selector: 'app-addedit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    
  ],
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css'] , // Corrected this line
 
})
export class AddeditComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private _fb: FormBuilder, private _medrepservice:MedicalrepService,
    public _dialogRef: MatDialogRef<AddeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this._fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      territory: ['', Validators.required],
      phone_number: ['', Validators.required],
      admin_id: ['', Validators.required],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      location_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
   
   }

  onSubmit() {
    if (this.userForm.valid) {
      this._medrepservice.addMedrep(this.userForm.value).subscribe({
        next:(val : any) => {
           alert('Medical rep added successfully');
           this._dialogRef.close(this.userForm.value);
        },
        error:(err:any) =>{
          console.error(err)
        },
      });
     
    
    }
  }

  onCancel(): void {
    this._dialogRef.close();
  }
}
