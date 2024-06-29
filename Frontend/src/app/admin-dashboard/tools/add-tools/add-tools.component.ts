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
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'; 
import { MatSelectModule } from '@angular/material/select';
import { SalesService } from '../../../services/user_services/user-services.service';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-tools',
  standalone: true,
  imports: [ MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
   ],
  templateUrl: './add-tools.component.html',
  styleUrl: './add-tools.component.css'
})
export class AddToolsComponent implements OnInit {
  @Output() toolAdded = new EventEmitter<any>();
  userForm: FormGroup;
  isFormSubmitted = false;
  initialToolData: any;

  constructor(
    private fb: FormBuilder,
    private toolService: AdminDashboardService,
    public dialogRef: MatDialogRef<AddToolsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      type: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue(this.data);
      this.initialToolData = { ...this.data };
    }
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      if (this.data) {
        const updatedTool = { ...this.initialToolData, ...formData };
        this.toolService.updateTool(this.data.id, updatedTool).subscribe({
          next: (val: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Tool details updated successfully',
            });
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Update Error:', err);
            this.handleErrorResponse(err);
          }
        });
      } else {
        this.toolService.addTool(formData).subscribe({
          next: (val: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Tool added successfully',
            });
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Add Error:', err);
            this.handleErrorResponse(err);
          }
        });
      }
    }
  }

  private handleErrorResponse(err: any): void {
    if (err.status === 422) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Validation error. Please check the input data.',
      });
      console.error('Validation Errors:', err.error.errors);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again.',
      });
    }
  }
}