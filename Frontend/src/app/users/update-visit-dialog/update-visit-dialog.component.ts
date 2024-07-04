import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { VisitModelTs } from '../../models/visit.model.ts';

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

//work
// export class UpdateVisitDialogComponent implements OnInit {
//   visitForm: FormGroup;
//   doctors: any[] = [];
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
//       visit_date: [data.visit_date || '', Validators.required],
//       visit_time: [data.visit_time || '', Validators.required],
//       purpose: [data.purpose || '', Validators.required],
//       status: [data.status || 'ongoing', Validators.required],
//       doctorCtrl: [null, Validators.required],
//       tools: [data.tools || []], 
//     });
//   }

//   ngOnInit(): void {
//     this.visitService.getDoctors().subscribe(doctors => {
//       this.doctors = doctors;
//       this.filteredDoctors$ = this.visitForm.get('doctorCtrl')!.valueChanges.pipe(
//         startWith(''),
//         map(value => (typeof value === 'string' ? value : value.first_name)),
//         map(name => name ? this._filterDoctors(name) : this.doctors.slice())
//       );

//       // Set the initial doctor value
//       const initialDoctor = this.doctors.find(doc => doc.id === this.data.doctor_id);
//       this.visitForm.patchValue({ doctorCtrl: initialDoctor });
//     });

//     this.visitService.getTools().subscribe(tools => {
//       this.tools = tools;
//       this.visitForm.patchValue({ tools: this.data.tools.map((tool: any) => tool.id) });
//     });
//   }

//   displayDoctorFn(doctor: any): string {
//     return doctor ? `${doctor.first_name} ${doctor.last_name}` : '';
//   }

//   private _filterDoctors(name: string): any[] {
//     const filterValue = name.toLowerCase();
//     return this.doctors.filter(option =>
//       option.first_name.toLowerCase().includes(filterValue) || option.last_name.toLowerCase().includes(filterValue)
//     );
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onSave(): void {
//     if (this.visitForm.valid) {
//       const updatedVisit = {
//         ...this.visitForm.value,
//         doctor_id: this.visitForm.value.doctorCtrl.id,
//         doctorCtrl: undefined ,// remove doctorCtrl as it is not needed in the final object
//         tools: this.visitForm.value.tools
//       };
//       this.dialogRef.close(updatedVisit);
      
//     }
//   }
// }

//work with tools
// export class UpdateVisitDialogComponent implements OnInit {
//   visitForm: FormGroup;
//   doctors: any[] = [];
//   tools: any[] = [];
//   statusOptions: string[] = ['ongoing', 'closed', 'done'];
//   filteredDoctors$!: Observable<any[]>;

//   constructor(
//     private fb: FormBuilder,
//     private visitService: VisitService,
//     public dialogRef: MatDialogRef<UpdateVisitDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private cdr: ChangeDetectorRef
//   ) {
//     this.visitForm = this.fb.group({
//       visit_date: [data.visit_date || '', Validators.required],
//       visit_time: [data.visit_time || '', Validators.required],
//       purpose: [data.purpose || '', Validators.required],
//       status: [data.status || 'ongoing', Validators.required],
//       doctorCtrl: [null, Validators.required],
//       tools: [data.tools ? data.tools.map((tool: any) => tool.id) : []],
//     });

//     console.log('Initial form data:', this.visitForm.value);
//   }

//   ngOnInit(): void {
//     this.visitService.getDoctors().subscribe(doctors => {
//       this.doctors = doctors;
//       console.log('Fetched doctors:', this.doctors);

//       this.filteredDoctors$ = this.visitForm.get('doctorCtrl')!.valueChanges.pipe(
//         startWith(''),
//         map(value => (typeof value === 'string' ? value : value.first_name)),
//         map(name => name ? this._filterDoctors(name) : this.doctors.slice())
//       );

//       // Set the initial doctor value
//       const initialDoctor = this.doctors.find(doc => doc.id === this.data.doctor_id);
//       console.log('Initial doctor:', initialDoctor);
//       this.visitForm.patchValue({ doctorCtrl: initialDoctor });
//     });

//     this.visitService.getTools().subscribe(tools => {
//       this.tools = tools;
//       console.log('Fetched tools:', this.tools);

//       console.log('Initial tools data from this.data:', this.data.tools);

//       // Ensure tools data is correctly mapped
//       const toolIds = this.data.tools.map((tool: any) => {
//         const toolObject = this.tools.find(t => t.id === tool.id);
//         console.log('Tool:', tool, 'Tool Object:', toolObject);
//         return toolObject ? toolObject.id : undefined;
//       });

//       console.log('Mapped tool ids:', toolIds);

//       this.visitForm.patchValue({ tools: toolIds });
//       console.log('Form data after tools patch:', this.visitForm.value);

//       // Trigger change detection
//       this.cdr.detectChanges();
//     });
//   }

//   displayDoctorFn(doctor: any): string {
//     return doctor ? `${doctor.first_name} ${doctor.last_name}` : '';
//   }

//   private _filterDoctors(name: string): any[] {
//     const filterValue = name.toLowerCase();
//     return this.doctors.filter(option =>
//       option.first_name.toLowerCase().includes(filterValue) || option.last_name.toLowerCase().includes(filterValue)
//     );
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onSave(): void {
//     if (this.visitForm.valid) {
//       const updatedVisit = {
//         ...this.visitForm.value,
//         doctor_id: this.visitForm.value.doctorCtrl.id,
//         doctorCtrl: undefined, // remove doctorCtrl as it is not needed in the final object
//         tools: this.visitForm.value.tools.map((toolId: number) => {
//           return { id: toolId };
//         }) // Ensure tools are saved as an array of objects with IDs
//       };
//       console.log('Updated visit data:', updatedVisit);
//       this.dialogRef.close(updatedVisit);
//     } else {
//       console.log('Form is invalid');
//       Object.keys(this.visitForm.controls).forEach(field => {
//         const control = this.visitForm.get(field);
//         console.log(field, control!.errors);
//       });
//     }
//   }
// }


export class UpdateVisitDialogComponent implements OnInit {
  visitForm: FormGroup;
  doctors: any[] = [];
  tools: any[] = [];
  visits: any[] = [];
  statusOptions: string[] = ['ongoing', 'closed', 'done'];
  filteredDoctors$!: Observable<any[]>;

  @Output() visitUpdated = new EventEmitter<VisitModelTs>();

  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    public dialogRef: MatDialogRef<UpdateVisitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.visitForm = this.fb.group({
      id: [data.visit.id],
      visit_date: [data.visit.visit_date || '', Validators.required],
      visit_time: [data.visit.visit_time || '', Validators.required],
      purpose: [data.visit.purpose || '', Validators.required],
      status: [data.visit.status || 'ongoing', Validators.required],
      doctorCtrl: [null, Validators.required],
      tools: [data.visit.tools ? data.visit.tools.map((tool: any) => tool.id) : []],
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

      const initialDoctor = this.doctors.find(doc => doc.id === this.data.visit.doctor_id);
      this.visitForm.patchValue({ doctorCtrl: initialDoctor });
    });

    this.visitService.getTools().subscribe(tools => {
      this.tools = tools;
      const toolIds = this.data.visit.tools.map((tool: any) => {
        const toolObject = this.tools.find(t => t.id === tool.id);
        return toolObject ? toolObject.id : undefined;
      });
      this.visitForm.patchValue({ tools: toolIds });
      this.cdr.detectChanges();
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
        doctorCtrl: undefined,
        tools: this.visitForm.value.tools,
      };

      console.log('Updating visit with data:', updatedVisit);

      this.visitService.updateVisit(updatedVisit).subscribe(
        (response) => {
          console.log('Visit updated successfully:', response);

          if (this.visits && Array.isArray(this.visits)) {
            const index = this.visits.findIndex(visit => visit.id === updatedVisit.id);
            if (index !== -1) {
              this.visits[index] = updatedVisit;
              this.cdr.detectChanges();
            } else {
              console.warn('Visit not found in visits array');
            }
          } else {
            console.error('Visits array is not defined or is not an array');
          }

          this.visitUpdated.emit(updatedVisit); // Emit the event
          this.dialogRef.close(updatedVisit);

          this.snackBar.open('Visit updated successfully!', 'Close', {
            duration: 4000
          });
        },
        (error) => {
          console.error('Failed to update visit:', error);
          this.snackBar.open('Failed to update visit. Please try again later.', 'Close', {
            duration: 4000
          });
        }
      );
    } else {
      console.log('Form is invalid');
      Object.keys(this.visitForm.controls).forEach(field => {
        const control = this.visitForm.get(field);
        console.log(field, control!.errors);
      });
    }
  }
}