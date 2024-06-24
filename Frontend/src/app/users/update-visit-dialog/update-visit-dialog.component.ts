import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { VisitService } from '../services/visit.service';
import { MatLabel ,MatFormField} from '@angular/material/form-field';
import { MatDatepicker ,MatDatepickerModule,MatDatepickerToggle} from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule,MatFormField,MatDialogModule,MatLabel,MatDatepicker,
    MatDatepickerToggle,MatSelect , MatOption,  MatInputModule,
    ReactiveFormsModule,MatButtonModule, MatDatepickerModule],
  selector: 'app-update-visit-dialog',
  templateUrl: './update-visit-dialog.component.html',
  styleUrls: ['./update-visit-dialog.component.css']
})
// export class UpdateVisitDialogComponent implements OnInit {
//   visitForm: FormGroup;
//   doctors: any[] = [];
//   locations: any[] = []; // Replace with actual location data
//   statusOptions = ['ongoing', 'closed', 'done']; // Enum options

//   constructor(
//     private fb: FormBuilder,
//     private dialogRef: MatDialogRef<UpdateVisitDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private visitService: VisitService
//   ) {
//     this.visitForm = this.fb.group({
//       visit_date: [data.visit_date, Validators.required],
//       visit_time: [data.visit_time, Validators.required],
//       purpose: [data.purpose, Validators.required],
//       status: [data.status, Validators.required],
//       doctor_id: [data.doctor_id, Validators.required],
//       location_id: [data.location_id, Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.fetchDoctors();
//     this.fetchLocations();
    
//   }


//   fetchDoctors() {
//     this.visitService.getDoctors().subscribe(doctors => {
//       this.doctors = doctors;
//     });
//   }

//   fetchLocations() {
//     this.visitService.getLocations().subscribe(locations => {
//       this.locations = locations;
//     });
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onSave(): void {
//     if (this.visitForm.valid) {
//       const updatedVisit = { ...this.data, ...this.visitForm.value };
//       this.visitService.updateVisit(updatedVisit).subscribe(response => {
//         this.dialogRef.close(response);
//       });
//     }
//   }

//   onDelete(): void {

//     this.dialogRef.close({ action: 'delete', id: this.data.id });
//   }
  

// }



export class UpdateVisitDialogComponent implements OnInit {
  visitForm: FormGroup;
  doctors: any[] = [];
  locations: any[] = [];
  statusOptions = ['ongoing', 'closed', 'done'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateVisitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private visitService: VisitService
  ) {
    this.visitForm = this.fb.group({
      visit_date: [data.visit_date, Validators.required],
      visit_time: [data.visit_time, Validators.required],
      purpose: [data.purpose, Validators.required],
      status: [data.status, Validators.required],
      doctor_id: [data.doctor_id, Validators.required],
      doctor_city: [{ value: '', disabled: true }],
      doctor_state: [{ value: '', disabled: true }],
      doctor_street: [{ value: '', disabled: true }],
     
      
    });
  }

  ngOnInit(): void {
    this.fetchDoctors();
  
    

    this.visitForm.get('doctor_id')?.valueChanges.subscribe(doctorId => {
      const selectedDoctor = this.doctors.find(doc => doc.id === doctorId);
      if (selectedDoctor) {
        this.visitForm.patchValue({
          doctor_city: selectedDoctor.city,
          doctor_state: selectedDoctor.state,
          doctor_street: selectedDoctor.street
        });
      } else {
        this.visitForm.patchValue({
          doctor_city: '',
          doctor_state: '',
          doctor_street: ''
        });
      }
    });
  }

  fetchDoctors() {
    this.visitService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.visitForm.valid) {
      const updatedVisit = { ...this.data, ...this.visitForm.value };
      this.visitService.updateVisit(updatedVisit).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
  }

  onDelete(): void {
  
    
      this.dialogRef.close({ action: 'delete', id: this.data.id });
    
  }
}


