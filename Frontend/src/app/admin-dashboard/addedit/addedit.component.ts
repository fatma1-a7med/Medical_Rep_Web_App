import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { MedicalrepService } from '../../services/medicalrep.service';
import { DatePipe } from '@angular/common'
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';; 
import { MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-addedit',
  standalone: true,
  providers: [DatePipe],
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
    CommonModule ,
    MatOption,
    MatSelectModule,
    MatFormField,
    FormsModule
  ],
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})

  
export class AddeditComponent implements OnInit {
  @Output() medrepAdded = new EventEmitter<any>();
  userForm: FormGroup;
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _medrepservice: MedicalrepService,
    public _dialogRef: MatDialogRef<AddeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.userForm = this._fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(255)]],
      last_name: ['', [Validators.required, Validators.maxLength(255)]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.maxLength(255)]],
      gender: ['', [Validators.required, Validators.pattern(/^(Male|Female)$/)]],
      birthDate: [null, [Validators.required]],
      admin_id: [''],
      phone_number: ['', [Validators.required, Validators.maxLength(20)]],
      territory: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    console.log('Incoming data:', this.data); // Log incoming data

    this.loadStates().then(() => {
      if (this.data) {
        this.userForm.patchValue(this.data);
        
        // Convert state name to state ID
        const stateId = this.states.find(state => state.name === this.data.state)?.id;
        if (stateId) {
          this.userForm.get('state')?.setValue(stateId);
          this.loadCities(stateId).then(() => {
            const cityId = this.cities.find(city => city.name === this.data.city)?.id;
            this.userForm.get('city')?.setValue(cityId);
          });
        }
      }
    });
  }

  loadStates(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._medrepservice.getStates().subscribe({
        next: (states: any[]) => {
          this.states = states;
          console.log('States loaded:', this.states); // Log loaded states
          resolve();
        },
        error: (err: any) => {
          console.error('Failed to load states', err);
          reject(err);
        }
      });
    });
  }

  loadCities(stateId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._medrepservice.getCities(stateId).subscribe({
        next: (cities: any[]) => {
          this.cities = cities;
          console.log('Cities loaded for state', stateId, ':', this.cities); 
          resolve();
        },
        error: (err: any) => {
          console.error('Failed to load cities', err);
          reject(err);
        }
      });
    });
  }

  onStateChange(stateId: number): void {
    this.loadCities(stateId).then(() => {
      this.userForm.get('city')?.setValue(null); 
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formattedDate = this.datePipe.transform(this.userForm.value.birthDate, 'yyyy-MM-dd');
      this.userForm.patchValue({ birthDate: formattedDate });

      const state = this.states.find(state => state.id === this.userForm.value.state)?.name;
      const city = this.cities.find(city => city.id === this.userForm.value.city)?.name;

      const formData = {
        ...this.userForm.value,
        state: state,
        city: city
      };
      console.log('Form Data:', formData);

      if (this.data) {
        this._medrepservice.updateMedrep(this.data.id, formData).subscribe({
          next: (val: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Medical rep details updated successfully',
            });
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Update Error:', err);
            if (err.status === 422) {
              Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Failed to update medical rep details. Please check the input data.',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again.',
              });
            }
          }
        });
      } else {
        this._medrepservice.addMedrep(formData).subscribe({
          next: (val: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Medical rep added successfully',
            });
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Add Error:', err);
            if (err.status === 422) {
              Swal.fire({
                icon: 'error',
                title: 'Add Failed',
                text: 'Failed to add medical rep. Please check the input data.',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again.',
              });
            }
          }
        });
      }
    }
  }
}