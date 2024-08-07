
import { Component, ChangeDetectorRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { VisitService } from '../services/visit.service';
import { AuthService } from '../../services/auth.service';
import { VisitModelTs } from '../../models/visit.model.ts';
import { createEventId } from './event-utils';
import { TokenService } from '../../services/token.service';
import {  AddVisitDialogComponent } from '../add-visit-dialog/add-visit-dialog.component'; 
import { UpdateVisitDialogComponent } from '../update-visit-dialog/update-visit-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uservisit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule],
  templateUrl: './uservisit.component.html',
  styleUrls: ['./uservisit.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
// export class UservisitComponent {
//   @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

//   calendarVisible = true;
//   calendarOptions: CalendarOptions = {
//     plugins: [
//       interactionPlugin,
//       dayGridPlugin,
//       timeGridPlugin,
//       listPlugin,
//     ],
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
//     },
//     initialView: 'dayGridMonth',
//     initialEvents: [], // Start with an empty array
//     weekends: true,
//     editable: true,
//     selectable: true,
//     selectMirror: true,
//     dayMaxEvents: true,
//     select: this.handleDateSelect.bind(this),
//     eventClick: this.handleEventClick.bind(this),
//     eventsSet: this.handleEvents.bind(this),
//   };
//   currentEvents: EventApi[] = [];

//   constructor(
//     private changeDetector: ChangeDetectorRef,
//     private visitService: VisitService,
//     public dialog: MatDialog,
//     private authService: AuthService,
//     private tokenService: TokenService
//   ) {
//     this.loadEvents();
//   }

//   handleCalendarToggle() {
//     this.calendarVisible = !this.calendarVisible;
//     this.changeDetector.detectChanges();
//   }

//   handleWeekendsToggle() {
//     this.calendarOptions.weekends = !this.calendarOptions.weekends;
//     this.changeDetector.detectChanges();
//   }

//   handleDateSelect(selectInfo: DateSelectArg) {
//     const dialogRef = this.dialog.open(AddVisitDialogComponent, {
//       width: '400px',
//       data: {
//         visit_date: selectInfo.startStr,
//         visit_time: selectInfo.startStr.split('T')[1],
//         doctor_id: null,
//         purpose: ''
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         const calendarApi = this.calendarComponent.getApi();
//         const newEvent = {
//           id: createEventId(), // Ensure createEventId() returns a valid number
//           title: result.purpose,
//           start: `${result.visit_date}T${result.visit_time}`,
//           allDay: false
//         };

//         calendarApi.addEvent(newEvent);
//         this.saveEventToServer(newEvent);
//       }
//     });

//     const calendarApi = this.calendarComponent.getApi();
//     calendarApi.unselect(); // Clear date selection
//   }

//   handleEventClick(clickInfo: EventClickArg) {
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove();
//       this.deleteEventFromServer(Number(clickInfo.event.id));
//     }
//   }

//   handleEvents(events: EventApi[]) {
//     this.currentEvents = events;
//     this.changeDetector.detectChanges();
//   }

//   loadEvents() {
//     this.visitService.getVisits().subscribe((visits) => {
//       const calendarApi = this.calendarComponent.getApi();
//       visits.forEach(visit => {
//         calendarApi.addEvent({
//           id: visit.id.toString(),
//           title: visit.purpose,
//           start: `${visit.visit_date}T${visit.visit_time}`,
//           allDay: false
//         });
//       });
//     });
//   }

//   saveEventToServer(event: any) {
//     // const currentUser = this.tokenService.getUserInfo();
//     // if (!currentUser || !currentUser.id) {
//     //   console.error('Current user or user ID not found.');
//     //   return;
//     // }

//     const visit: VisitModelTs = {
//       id: Number(event.id), 
//       purpose: event.title,
//       visit_date: event.start.split('T')[0],
//       visit_time: event.start.split('T')[1],
//       status: 'ongoing', // Default status
//       created_at: new Date(),
//       updated_at: new Date(),
//       user_id: event.user_id,
//       doctor_id: event.doctor_id,
//       tools: []
//     };

//     this.visitService.createVisit(visit).subscribe({
//       next: response => {
//         console.log('Event saved successfully:', response);
//       },
//       error: error => {
//         console.error('Error saving event:', error);
//       }
//     });
//   }

//   deleteEventFromServer(id: number) {
//     this.visitService.deleteVisit(id).subscribe({
//       next: () => {
//         console.log('Event deleted successfully');
//       },
//       error: error => {
//         console.error('Error deleting event:', error);
//       }
//     });
//   }
//   handleEventEdit(event: EventApi) {
//     const dialogRef = this.dialog.open(UpdateVisitDialogComponent, {
//       width: '400px',
//       data: {
//         id: event.id,
//         visit_date: event.startStr.split('T')[0],
//         visit_time: event.startStr.split('T')[1],
//         purpose: event.title,
//         status: event.extendedProps['status'],
//         doctor_id: event.extendedProps['doctor_id'],
//         tools: event.extendedProps['tools'],
//       }
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         event.setProp('title', result.purpose);
//         event.setStart(`${result.visit_date}T${result.visit_time}`);
//         event.setExtendedProp('status', result.status);
//         event.setExtendedProp('doctor_id', result.doctor_id);
//         event.setExtendedProp('tools', result.tools);
  
//         this.updateEventOnServer(event);
//       }
//     });
//   }
  
//   updateEventOnServer(event: EventApi) {
//     const visit: VisitModelTs = {
//       id: Number(event.id),
//       purpose: event.title,
//       visit_date: event.startStr.split('T')[0],
//       visit_time: event.startStr.split('T')[1],
//       status: event.extendedProps['status'],
//       created_at: new Date(),
//       updated_at: new Date(),
//       user_id: event.extendedProps['user_id'],
//       doctor_id: event.extendedProps['doctor_id'],
//       tools: event.extendedProps['tools'],
//     };
  
//     this.visitService.updateVisit(visit).subscribe({
//       next: (response) => {
//         console.log('Event updated successfully:', response);
//       },
//       error: (error) => {
//         console.error('Error updating event:', error);
//       }
//     });
//   }
  
// }
//
// export class UservisitComponent {
//   @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

//   calendarVisible = true;
//   calendarOptions: CalendarOptions = {
//     plugins: [
//       interactionPlugin,
//       dayGridPlugin,
//       timeGridPlugin,
//       listPlugin,
//     ],
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
//     },
//     initialView: 'dayGridMonth',
//     initialEvents: [], // Start with an empty array
//     weekends: true,
//     editable: true,
//     selectable: true,
//     selectMirror: true,
//     dayMaxEvents: true,
//     select: this.handleDateSelect.bind(this),
//     eventClick: this.handleEventClick.bind(this),
//     eventsSet: this.handleEvents.bind(this),
//   };
//   currentEvents: EventApi[] = [];

//   constructor(
//     private changeDetector: ChangeDetectorRef,
//     private visitService: VisitService,
//     public dialog: MatDialog,
//     private authService: AuthService,
//     private tokenService: TokenService
//   ) {
//     this.loadEvents();
//   }

//   handleCalendarToggle() {
//     this.calendarVisible = !this.calendarVisible;
//     this.changeDetector.detectChanges();
//   }

//   handleWeekendsToggle() {
//     this.calendarOptions.weekends = !this.calendarOptions.weekends;
//     this.changeDetector.detectChanges();
//   }

//   handleDateSelect(selectInfo: DateSelectArg) {
//     const dialogRef = this.dialog.open(AddVisitDialogComponent, {
//       width: '400px',
//       data: {
//         visit_date: selectInfo.startStr,
//         visit_time: selectInfo.startStr.split('T')[1],
//         doctor_id: null,
//         purpose: ''
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         const calendarApi = this.calendarComponent.getApi();
//         const newEvent = {
//           id: createEventId(), // Ensure createEventId() returns a valid number
//           title: result.purpose,
//           start: `${result.visit_date}T${result.visit_time}`,
//           allDay: false
//         };

//         calendarApi.addEvent(newEvent);
//         this.saveEventToServer(newEvent);
//       }
//     });

//     const calendarApi = this.calendarComponent.getApi();
//     calendarApi.unselect(); // Clear date selection
//   }

//   handleEventClick(clickInfo: EventClickArg) {
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove();
//       this.deleteEventFromServer(Number(clickInfo.event.id));
//     } else {
//       this.handleEventEdit(clickInfo.event);
//     }
//   }

//   handleEvents(events: EventApi[]) {
//     this.currentEvents = events;
//     this.changeDetector.detectChanges();
//   }

//   loadEvents() {
//     this.visitService.getVisits().subscribe((visits) => {
//       const calendarApi = this.calendarComponent.getApi();
//       visits.forEach(visit => {
//         calendarApi.addEvent({
//           id: visit.id.toString(),
//           title: visit.purpose,
//           start: `${visit.visit_date}T${visit.visit_time}`,
//           allDay: false,
//           extendedProps: {
//             status: visit.status,
//             doctor_id: visit.doctor_id,
//             tools: visit.tools,
//             user_id: visit.user_id
//           }
//         });
//       });
//     });
//   }

//   saveEventToServer(event: any) {
//     const visit: VisitModelTs = {
//       id: Number(event.id),
//       purpose: event.title,
//       visit_date: event.start.split('T')[0],
//       visit_time: event.start.split('T')[1],
//       status: 'ongoing',
//       created_at: new Date(),
//       updated_at: new Date(),
//       user_id: event.extendedProps.user_id,
//       doctor_id: event.extendedProps.doctor_id,
//       tools: event.extendedProps.tools || []
//     };

//     this.visitService.createVisit(visit).subscribe({
//       next: response => {
//         console.log('Event saved successfully:', response);
//       },
//       error: error => {
//         console.error('Error saving event:', error);
//       }
//     });
//   }

//   deleteEventFromServer(id: number) {
//     this.visitService.deleteVisit(id).subscribe({
//       next: () => {
//         console.log('Event deleted successfully');
//       },
//       error: error => {
//         console.error('Error deleting event:', error);
//       }
//     });
//   }

//   handleEventEdit(event: EventApi) {
//     const dialogRef = this.dialog.open(UpdateVisitDialogComponent, {
//       width: '400px',
//       data: {
//         id: event.id,
//         visit_date: event.startStr.split('T')[0],
//         visit_time: event.startStr.split('T')[1],
//         purpose: event.title,
//         status: event.extendedProps['status'],
//         doctor_id: event.extendedProps['doctor_id'],
//         tools: event.extendedProps['tools'],
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         event.setProp('title', result.purpose);
//         event.setStart(`${result.visit_date}T${result.visit_time}`);
//         event.setExtendedProp('status', result.status);
//         event.setExtendedProp('doctor_id', result.doctor_id);
//         event.setExtendedProp('tools', result.tools);

//         this.updateEventOnServer(event);
//       }
//     });
//   }

//   updateEventOnServer(event: EventApi) {
//     const visit: VisitModelTs = {
//       id: Number(event.id),
//       purpose: event.title,
//       visit_date: event.startStr.split('T')[0],
//       visit_time: event.startStr.split('T')[1],
//       status: event.extendedProps['status'],
//       created_at: new Date(),
//       updated_at: new Date(),
//       user_id: event.extendedProps['user_id'],
//       doctor_id: event.extendedProps['doctor_id'],
//       tools: event.extendedProps['tools'],
//     };

//     this.visitService.updateVisit(visit).subscribe({
//       next: (response) => {
//         console.log('Event updated successfully:', response);
//       },
//       error: (error) => {
//         console.error('Error updating event:', error);
//       }
//     });
//   }
// }

export class UservisitComponent {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: [], // Start with an empty array
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private visitService: VisitService,
    public dialog: MatDialog,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.loadEvents();
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
    this.changeDetector.detectChanges();
  }

  handleWeekendsToggle() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
    this.changeDetector.detectChanges();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(AddVisitDialogComponent, {
      width: '400px',
      data: {
        visit_date: selectInfo.startStr,
        visit_time: selectInfo.startStr.split('T')[1],
        doctor_id: null,
        purpose: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const calendarApi = this.calendarComponent.getApi();
        const newEvent = {
          id: createEventId(), // Ensure createEventId() returns a valid number
          title: result.purpose,
          start: `${result.visit_date}T${result.visit_time}`,
          allDay: false
        };

        calendarApi.addEvent(newEvent);
        this.saveEventToServer(newEvent);
      }
    });

    const calendarApi = this.calendarComponent.getApi();
    calendarApi.unselect(); // Clear date selection
  }

  handleEventClick(clickInfo: EventClickArg) {
    Swal.fire({
      title: `Are you sure you want to delete the visit '${clickInfo.event.title}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        clickInfo.event.remove();
        this.deleteEventFromServer(Number(clickInfo.event.id));
      }
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  loadEvents() {
    this.visitService.getVisits().subscribe((visits) => {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.removeAllEvents(); // Clear existing events
      visits.forEach(visit => {
        calendarApi.addEvent({
          id: visit.id.toString(),
          title: visit.purpose,
          start: `${visit.visit_date}T${visit.visit_time}`,
          allDay: false,
          extendedProps: {
            status: visit.status,
            doctor_id: visit.doctor_id,
            tools: visit.tools,
            user_id: visit.user_id
          }
        });
      });
    });
  }

  saveEventToServer(event: any) {
    const visit: VisitModelTs = {
      id: Number(event.id),
      purpose: event.title,
      visit_date: event.start.split('T')[0],
      visit_time: event.startStr!.split('T')[1].slice(0, 5),
      status: 'ongoing',
      created_at: new Date(),
      updated_at: new Date(),
      user_id: event.extendedProps.user_id,
      doctor_id: event.extendedProps.doctor_id,
      tools: event.extendedProps.tools || []
    };

    this.visitService.createVisit(visit).subscribe({
      next: response => {
        console.log('Event saved successfully:', response);
      },
      error: error => {
        console.error('Error saving event:', error);
      }
    });
  }

  deleteEventFromServer(id: number) {
    this.visitService.deleteVisit(id).subscribe({
      next: () => {
        console.log('Event deleted successfully');
      },
      error: error => {
        console.error('Error deleting event:', error);
      }
    });
  }

  handleEventEdit(event: EventApi) {
    const dialogRef = this.dialog.open(UpdateVisitDialogComponent, {
      width: '400px',
      data: {
        visit: {
          id: event.id,
          visit_date: event.startStr.split('T')[0],
          visit_time: event.startStr.split('T')[1].slice(0, 5),
          purpose: event.title,
          status: event.extendedProps['status'],
          doctor_id: event.extendedProps['doctor_id'],
          tools: event.extendedProps['tools'],
        },
      }
    });

    dialogRef.componentInstance.visitUpdated.subscribe((updatedVisit: VisitModelTs) => {
      // Update the event in the calendar
      const calendarApi = this.calendarComponent.getApi();
      const eventToUpdate = calendarApi.getEventById(updatedVisit.id.toString());
      if (eventToUpdate) {
        eventToUpdate.setProp('title', updatedVisit.purpose);
        eventToUpdate.setStart(`${updatedVisit.visit_date}T${updatedVisit.visit_time}`);
        eventToUpdate.setExtendedProp('status', updatedVisit.status);
        eventToUpdate.setExtendedProp('doctor_id', updatedVisit.doctor_id);
        eventToUpdate.setExtendedProp('tools', updatedVisit.tools);
        eventToUpdate.setExtendedProp('user_id', updatedVisit.user_id);
      }

      this.updateEventOnServer(eventToUpdate!); // Update the event on the server
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEvents(); // Optionally reload events to ensure calendar is up-to-date
      }
    });
  }

  updateEventOnServer(event: EventApi) {
    const visit: VisitModelTs = {
      id: Number(event.id),
      purpose: event.title,
      visit_date: event.startStr.split('T')[0],
      visit_time: event.startStr.split('T')[1].slice(0, 5),
      status: event.extendedProps['status'],
      created_at: new Date(),
      updated_at: new Date(),
      user_id: event.extendedProps['user_id'],
      doctor_id: event.extendedProps['doctor_id'],
      tools: event.extendedProps['tools'],
    };

    this.visitService.updateVisit(visit).subscribe({
      next: (response) => {
        console.log('Event updated successfully:', response);
        this.loadEvents();
      },
      error: (error) => {
        console.error('Error updating event:', error);
      }
    });
  }
}