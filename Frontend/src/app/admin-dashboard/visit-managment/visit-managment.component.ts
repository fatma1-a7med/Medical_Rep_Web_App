import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visit-managment',
  standalone: true,
  providers: [DatePipe],
  imports: [FormsModule, RouterLink, HttpClientModule, CommonModule],
  templateUrl: './visit-managment.component.html',
  styleUrl: './visit-managment.component.css'
})
export class VisitManagementComponent implements OnInit {
  visitDate: any[] = [];
  startDate: Date | null = null; 
  endDate: Date | null = null; 
  firstName: string = '';
  lastName: string = '';
  selectedVisit: any = null;

  constructor(private http: HttpClient, private datePipe: DatePipe) { } // Inject DatePipe

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.http.get<any[]>('http://localhost:8000/api/admin/visits')
      .subscribe(
        data => {
          this.visitDate = data;
        },
        error => {
          console.error('Error loading visit data:', error);
        }
      );
  }

  performSearch() {
    if (this.startDate && this.endDate) {
      this.searchByDateRange(this.startDate, this.endDate);
    } else if (this.firstName.trim() !== '' || this.lastName.trim() !== '') {
      this.searchByName(this.firstName, this.lastName);
    } else {
      console.error('Invalid search criteria');
    }
  }

  searchByDateRange(startDate: Date, endDate: Date) {
    // Format startDate and endDate using DatePipe
    const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');

    const url = `http://localhost:8000/api/admin/visits/searchByDateRange/${formattedStartDate}/${formattedEndDate}`;
    
    this.http.get<any[]>(url)
      .subscribe(
        data => {
          this.visitDate = data;
        },
        error => {
          console.error('Error searching by date range:', error);
        }
      );
  }

  searchByName(firstName: string, lastName: string) {
    const url = `http://localhost:8000/api/admin/visits/searchByUsername/${firstName}/${lastName}`;
    
    this.http.get<any[]>(url)
      .subscribe(
        data => {
          this.visitDate = data;
        },
        error => {
          console.error('Error searching by name:', error);
        }
      );
  }

  getDoctorNames(doctors: any[]) {
    return doctors.map(doctor => doctor.doctor_name).join(', ');
  }

  getToolNames(tools: any[]) {
    return tools.map(tool => tool.tool_name).join(', ');
  }

  showVisitDetails(visitId: number) {
    this.http.get<any>(`http://localhost:8000/api/admin/visits/${visitId}`)
      .subscribe(
        (data: any) => {
          this.selectedVisit = data;
        },
        (error) => {
          console.error('Error fetching visit details:', error);
        }
      );
  }
}