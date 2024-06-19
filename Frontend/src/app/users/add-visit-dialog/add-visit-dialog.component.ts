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
  selector: 'app-visit-dialog',
  standalone: true,
  imports: [CommonModule,MatFormField,MatDialogModule,MatLabel,MatDatepicker,
    MatDatepickerToggle,MatSelect , MatOption,  MatInputModule,
    ReactiveFormsModule,MatButtonModule, MatDatepickerModule],
  templateUrl: './add-visit-dialog.component.html',
  styleUrl: './add-visit-dialog.component.css'
})
export class AddVisitDialogComponent implements OnInit {

  visitForm: FormGroup;
  doctors: any[] = [];
  locations: any[] = [];
  statusOptions: string[] = ['ongoing', 'closed', 'done'];

  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    public dialogRef: MatDialogRef<AddVisitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.visitForm = this.fb.group({
      id: [data?.id || null],
      visit_date: [data?.visit_date || '', Validators.required],
      visit_time: [data?.visit_time || '', Validators.required],
      purpose: [data?.purpose || '', Validators.required],
      status: [data?.status || 'ongoing', Validators.required],
      med_id: [data?.med_id || null],
      doctor_id: [data?.doctor_id || '', Validators.required],
      tools_id: [data?.tools_id || null],
      location_id: [data?.location_id || '' ,Validators.required]
    });
  }

  ngOnInit(): void {
    this.visitService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
    this.visitService.getLocations().subscribe(locations => {
      this.locations = locations;
    }

    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.visitForm.valid) {
      this.dialogRef.close(this.visitForm.value);
    }
  }
}
