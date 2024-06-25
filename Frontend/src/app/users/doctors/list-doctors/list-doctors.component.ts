import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SalesService } from '../../../services/user_services/user-services.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { MatDialog , MatDialogModule} from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../../user/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


interface Doctor {
  id: number;
  fullname: string;
  phone_number: string;
  specialization: string;
}

@Component({
  selector: 'app-list-doctors',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatIcon,
    MatTableModule,
    MatPaginatorModule,

  ],  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListDoctorsComponent implements OnInit, AfterViewInit {
  doctors: Doctor[] = [];
  dataSource = new MatTableDataSource<Doctor>();
  username: string = '';
  filterValue: string = '';
  displayedColumns: string[] = ['full_name', 'phone_number', 'specialization', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private doctorServices: SalesService,
    private _dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadDoctors() {
    this.doctorServices.ListAllDoctors().subscribe(
      data => {
        this.doctors = data;
        this.dataSource.data = this.doctors;
      },
      error => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteDoctor(id: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorServices.deleteDoctor(id).subscribe(
        response => {
          console.log('Doctor deleted successfully:', response);
          this.loadDoctors(); // Reload doctors list
        },
        error => {
          console.error('Error deleting doctor:', error);
        }
      );
    }
  }

  navigateToDoctor(doctorId: number) {
    this.router.navigate(['/user/show-doctor', doctorId]);
  }

  openaddeditform(data: any) {
    const dialogRef = this._dialog.open(AddDoctorComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadDoctors();
        }
      },
    });
  }

  openaddForm() {
    const dialogRef = this._dialog.open(AddDoctorComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadDoctors();
        }
      },
    });
  }

  //search by name
  search() {
    if (this.username.trim() !== '') {
      const url = `http://localhost:8000/api/user/search/${this.username}`;
      console.log('Making request to:', url);

      this.http.get<Doctor[]>(url).subscribe(
        data => {
          console.log('Received data:', data);
          this.doctors = data;
          this.dataSource.data = this.doctors;
        },
        error => {
          console.error('Error searching by username:', error);
          this.doctors = [];
          this.dataSource.data = [];
        }
      );
    } else {
      console.error('Invalid username criteria');
      this.doctors = [];
      this.dataSource.data = [];
    }
  }
}
