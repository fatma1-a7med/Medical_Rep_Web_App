import { MatIcon } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VisitService } from '../../services/visit.service'; // Make sure this path is correct
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ShowVisitComponent } from './show-visit/show-visit.component';


interface Visit {
  id: number;
  medical_rep_fullname: string;
  visit_date: string;
  status: string;
  tools: any[];
  location_info: any;
  user_full_name: string;
  doctor_name: string;
  territory: string;
  city: string;
  state: string;
}

@Component({
  selector: 'app-visit-managment',
  standalone: true,
  providers: [DatePipe, ShowVisitComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    
  ],
  templateUrl: './visit-managment.component.html',
  styleUrls: ['./visit-managment.component.css']
})
export class VisitManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'medical_rep_fullname', 'visit_date', 'status', 'show'];
  dataSource = new MatTableDataSource<Visit>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  visitDate: Visit[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  username: string = '';
  filterValue: string = '';

  selectedVisit: Visit | null = null;
  dialog: any;

  constructor(private visitService: AdminDashboardService, private datePipe: DatePipe, private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllVisits();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchAllVisits() {
    this.visitService.getAllVisits().subscribe((data: Visit[]) => {
      this.dataSource.data = data;
    });
  }

  searchByDateRange() {
    if (this.startDate && this.endDate) {
      const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
      const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

      if (formattedStartDate && formattedEndDate) {
        const url = `http://localhost:8000/api/admin/visits/searchByDateRange/${formattedStartDate}/${formattedEndDate}`;

        this.http.get<Visit[]>(url).subscribe(
          (data) => {
            this.visitDate = data;
            this.dataSource.data = this.visitDate;
          },
          (error) => {
            console.error('Error searching by date range:', error);
          }
        );
      } else {
        console.error('Invalid date range');
      }
    } else {
      console.error('Invalid date range');
    }
  }

  searchByUsername() {
    if (this.username.trim() !== '') {
      const url = `http://localhost:8000/api/admin/visits/searchByUsername/${this.username}`;

      this.http.get<Visit[]>(url)
        .subscribe(
          data => {
            this.visitDate = data;
            this.dataSource.data = this.visitDate;
          },
          error => {
          if (error.status === 404) {
            // Handle 404 error specifically for no data found
            console.log('No visits found for the specified username');
            this.dataSource.data = []; // Clear the table data
          } else {
            console.error('Error searching by username:', error);
          }
        }
      );
  } else {
    console.error('Invalid username criteria');
  }
  }



}