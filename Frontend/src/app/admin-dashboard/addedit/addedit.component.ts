import { Component, Inject, OnInit ,EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
  @Output() medrepAdded = new EventEmitter<any>();
  userForm: FormGroup;
  

  constructor(
    private _fb: FormBuilder, 
    private _medrepservice:MedicalrepService,
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
   this.userForm.patchValue(this.data)
   }

   onSubmit() {
    if (this.userForm.valid) {
      if(this.data){
        this._medrepservice.updatemedrip(this.data.id,this.userForm.value).subscribe({
          next: (val: any) => {
              alert('Medicalrep details updated ');
              this._dialogRef.close(true);  
          },
          error: (err: any) => {
              console.error(err);  
          },
      });     
      } 
      else{
        this._medrepservice.addMedrep(this.userForm.value).subscribe({
            next: (val: any) => {
                alert('Medical rep added successfully');
                this._dialogRef.close(true);  
            },
            error: (err: any) => {
                console.error(err);  
            },
        });
      }
    }
   }
  
 
 
}
