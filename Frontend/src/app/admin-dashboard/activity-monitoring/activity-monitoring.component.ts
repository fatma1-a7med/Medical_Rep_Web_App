import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { VisitModelTs, GroupedVisits } from '../../models/visit.model.ts';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';  // Import MatSelectModule
import { VisitService } from '../../services/visit.service';
import { VisitDetailsDialogComponent } from '../visit-details-dialog/visit-details-dialog.component.js';


@Component({
  selector: 'app-activity-monitoring',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule,MatSelectModule,MatCardModule,MatDatepickerModule,
    MatNativeDateModule,FullCalendarModule,MatDialogModule
  ],
  templateUrl: './activity-monitoring.component.html',
  styleUrls: ['./activity-monitoring.component.css'],
  providers: [DatePipe]
})
export class ActivityMonitoringComponent implements OnInit {


  users: any[] = [];
  visitHistory: VisitModelTs[] = [];
  plannedVisits: GroupedVisits = {};

  selectedUser: any = null;
  startDate: string = '';
  endDate: string = '';
  firstName: string = '';
  lastName: string = '';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: []
  };

  constructor(private visitService: VisitService, private datePipe: DatePipe, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.visitService.getMedreplist().subscribe(
      (data: any[]) => {
        this.users = data;
      //console.log('Loaded users:', data);
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  searchVisits() {
    if (this.selectedUser) {
      this.loadVisitHistory(this.selectedUser.id);
      this.loadPlannedVisits(this.selectedUser.id);
    } else {
      console.error('No user selected');
    }
  }

  searchByDateRange() {
    if (this.startDate && this.endDate) {
      const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
      const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

      if (formattedStartDate && formattedEndDate) {
        this.visitService.searchVisitsByDateRange(formattedStartDate, formattedEndDate)
          .subscribe(
            (data: VisitModelTs[]) => {
              this.visitHistory = data;
              this.plannedVisits = this.groupByDate(data);
            },
            (error) => {
              console.error('Error searching by date range:', error);
            }
          );
      } else {
        console.error('Error formatting dates');
      }
    } else {
      console.error('Invalid date range');
    }
  }

  searchByName() {
    if (this.firstName.trim() !== '' || this.lastName.trim() !== '') {
      this.visitService.searchVisitsByUserName(this.firstName, this.lastName)
        .subscribe(
          (data: VisitModelTs[]) => {
            this.visitHistory = data;
            this.plannedVisits = this.groupByDate(data);
          },
          (error) => {
            console.error('Error searching by name:', error);
          }
        );
    } else {
      console.error('Invalid name criteria');
    }
  }

  loadVisitHistory(userId: number) {
    this.visitService.getVisitHistory(userId).subscribe(
      (data: VisitModelTs[]) => {
        this.visitHistory = data;
      },
      (error) => {
        console.error('Error loading visit history:', error);
      }
    );
  }

  loadPlannedVisits(userId: number) {
    this.visitService.getPlannedVisits(userId).subscribe(
      (data: VisitModelTs[]) => {
        const events = data.map((visit: VisitModelTs) => ({
          title: visit.purpose,
          start: `${visit.visit_date}T${visit.visit_time}`
        }));
        this.calendarOptions.events = events;
      },
      (error) => {
        console.error('Error loading planned visits:', error);
      }
    );
  }

  groupByDate(visits: VisitModelTs[]): GroupedVisits {
    return visits.reduce((acc: GroupedVisits, visit: VisitModelTs) => {
      const date = visit.visit_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(visit);
      return acc;
    }, {});
  }


  readMore(visit: VisitModelTs) {
    this.visitService.getVisitDetailsById(visit.id).subscribe(
      (details) => {
        this.dialog.open(VisitDetailsDialogComponent, {
          data: details
        });
      },
      (error) => {
        console.error('Error loading visit details:', error);
      }
    );
  }
}

