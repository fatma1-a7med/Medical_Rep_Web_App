import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { VisitService } from '../services/visit.service';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-update-visit-dialog',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    CommonModule,
    MatFormField,
    MatDialogModule,
    MatLabel,
    MatDatepicker,
    MatDatepickerToggle,
    MatSelect,
    MatOption,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule

  ],
  templateUrl: './update-visit-dialog.component.html',
  styleUrl: './update-visit-dialog.component.css'
})
// export class UpdateVisitDialogComponent implements OnInit {
//   visitForm: FormGroup;
//   doctors: any[] = [];
//   users: any[] = [];
//   tools: any[] = [];
//   statusOptions: string[] = ['ongoing', 'closed', 'done'];
//   filteredDoctors$!: Observable<any[]>;

//   constructor(
//     private fb: FormBuilder,
//     private visitService: VisitService,
//     public dialogRef: MatDialogRef<UpdateVisitDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.visitForm = this.fb.group({
//       visit_date: [data?.visit_date || '', Validators.required],
//       visit_time: [data?.visit_time || '', Validators.required],
//       purpose: [data?.purpose || '', Validators.required],
//       status: [data?.status || 'ongoing', Validators.required],
//       doctorCtrl: [data?.doctor_id || '', Validators.required],
//       tools: [[]],
//     });

//     if (data.tools) {
//       this.setTools(data.tools);
//     }
//   }

//   ngOnInit(): void {
//     this.filteredDoctors$ = this.visitForm.get('doctorCtrl')!.valueChanges.pipe(
//       startWith(''),
//       map(value => typeof value === 'string' ? value : value.first_name),
//       map(name => name ? this._filterDoctors(name) : this.doctors.slice())
//     );

//     this.visitService.getTools().subscribe(tools => {
//       this.tools = tools;
//     });

//     this.visitService.getDoctors().subscribe(doctors => {
//       this.doctors = doctors;
//     });

//     this.visitService.getUsers().subscribe(users => {
//       this.users = users;
//     });
//   }

//   private _filterDoctors(value: string): any[] {
//     const filterValue = value.toLowerCase();
//     return this.doctors.filter(doctor => doctor.first_name.toLowerCase().includes(filterValue));
//   }

//   displayDoctorFn(doctor?: any): string {
//     return doctor ? `${doctor.first_name} ${doctor.last_name}` : '';
//   }

//   setTools(toolIds: number[]): void {
//     const toolsFormArray = this.visitForm.get('tools') as FormArray;
//     toolIds.forEach(toolId => {
//       toolsFormArray.push(this.fb.control(toolId));
//     });
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onSave(): void {
//     if (this.visitForm.valid) {
//       const formData = { ...this.visitForm.value };
//       formData.doctor_id = formData.doctorCtrl.id;
//       delete formData.doctorCtrl;

//       formData.tools = formData.tools.map((toolId: number) => toolId);

//       formData.id = this.data.id; // Ensure we pass the id for update

//       this.visitService.updateVisit(formData).subscribe({
//         next: (response) => {
//           console.log('Visit updated successfully:', response);
//           this.dialogRef.close(response);
//         },
//         error: (error) => {
//           console.error('Error updating visit:', error);
//           alert('An error occurred while updating the visit.');
//         }
//       });
//     } else {
//       console.log('Form is invalid');
//       Object.keys(this.visitForm.controls).forEach(field => {
//         const control = this.visitForm.get(field);
//         console.log(field, control!.errors);
//       });
//       return;
//     }
//   }
// }

export class UpdateVisitDialogComponent implements OnInit {
  visitForm: FormGroup;
  doctors: any[] = [];
  tools: any[] = [];
  statusOptions: string[] = ['ongoing', 'closed', 'done'];
  filteredDoctors$!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    public dialogRef: MatDialogRef<UpdateVisitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.visitForm = this.fb.group({
      visit_date: [data.visit_date || '', Validators.required],
      visit_time: [data.visit_time || '', Validators.required],
      purpose: [data.purpose || '', Validators.required],
      status: [data.status || 'ongoing', Validators.required],
      doctorCtrl: [null, Validators.required],
      tools: [data.tools || []], 
    });
  }

  ngOnInit(): void {
    this.visitService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      this.filteredDoctors$ = this.visitForm.get('doctorCtrl')!.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.first_name)),
        map(name => name ? this._filterDoctors(name) : this.doctors.slice())
      );

      // Set the initial doctor value
      const initialDoctor = this.doctors.find(doc => doc.id === this.data.doctor_id);
      this.visitForm.patchValue({ doctorCtrl: initialDoctor });
    });

    this.visitService.getTools().subscribe(tools => {
      this.tools = tools;
      this.visitForm.patchValue({ tools: this.data.tools.map((tool: any) => tool.id) });
    });
  }

  displayDoctorFn(doctor: any): string {
    return doctor ? `${doctor.first_name} ${doctor.last_name}` : '';
  }

  private _filterDoctors(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.doctors.filter(option =>
      option.first_name.toLowerCase().includes(filterValue) || option.last_name.toLowerCase().includes(filterValue)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.visitForm.valid) {
      const updatedVisit = {
        ...this.visitForm.value,
        doctor_id: this.visitForm.value.doctorCtrl.id,
        doctorCtrl: undefined ,// remove doctorCtrl as it is not needed in the final object
        tools: this.visitForm.value.tools
      };
      this.dialogRef.close(updatedVisit);
    }
  }
}