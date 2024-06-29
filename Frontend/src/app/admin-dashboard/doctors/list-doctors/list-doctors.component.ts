import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SalesService } from '../../../services/user_services/user-services.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NavbarComponent } from '../../../user/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';  // Import SweetAlert2

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
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListdoctorsComponent implements OnInit, AfterViewInit {
  doctors: Doctor[] = [];
  dataSource = new MatTableDataSource<Doctor>();
  username: string = '';
  filterValue: string = '';
  displayedColumns: string[] = ['full_name', 'phone_number', 'specialization', 'actions'];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalDoctors: number = 0;

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
        this.totalDoctors = this.doctors.length;
        this.applyPaginator();
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
  navigateToDoctor(doctorId: number) {
    this.router.navigate(['/user/show-doctor', doctorId]);
  }


  search() {
    this.dataSource.filter = this.username.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.doctors.slice(startIndex, endIndex);
  }

  private applyPaginator() {
    this.paginator.length = this.totalDoctors;
    this.paginator.pageSizeOptions = this.pageSizeOptions;
    this.dataSource.paginator = this.paginator;
  }
}
