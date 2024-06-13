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

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

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



  searchByDateRange() {
    if (this.startDate && this.endDate) {
      const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
      const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

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
    } else {
      console.error('Invalid date range');
    }
  }

  searchByName() {
    if (this.firstName.trim() !== '' || this.lastName.trim() !== '') {
      const url = `http://localhost:8000/api/admin/visits/searchByUsername/${this.firstName}/${this.lastName}`;

      this.http.get<any[]>(url)
        .subscribe(
          data => {
            this.visitDate = data;
          },
          error => {
            console.error('Error searching by name:', error);
          }
        );
    } else {
      console.error('Invalid name criteria');
    }
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