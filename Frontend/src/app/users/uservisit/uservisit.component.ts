//import { Component, ChangeDetectorRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
// import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
// import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
// import interactionPlugin from '@fullcalendar/interaction';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// import { VisitService } from '../services/visit.service';
// import { AuthService } from '../../services/auth.service';
// import { VisitModelTs } from '../../models/visit.model.ts';
// import { createEventId } from './event-utils';
// import { TokenService } from '../../services/token.service';
// import {  AddVisitDialogComponent } from '../add-visit-dialog/add-visit-dialog.component'; 
// import { UpdateVisitDialogComponent } from '../update-visit-dialog/update-visit-dialog.component';
// @Component({
//   selector: 'app-uservisit',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, FullCalendarModule],
//   templateUrl: './uservisit.component.html',
//   styleUrls: ['./uservisit.component.css'],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
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
//           id: createEventId(),
//           title: result.purpose,
//           start: `${result.visit_date}T${result.visit_time}`,
//           allDay: false
//         };

//         calendarApi.addEvent(newEvent);
//         this.saveEventToServer(newEvent);
//       }
//     });

//     const calendarApi = this.calendarComponent.getApi();
//     calendarApi.unselect(); // clear date selection
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
//     const currentUser = this.tokenService.getUserInfo(); 
//     const visit: VisitModelTs = {
//       id: Number(event.id),
//       purpose: event.title,
//       visit_date: event.start.split('T')[0],
//       visit_time: event.start.split('T')[1],
//       status: 'ongoing', // default status
//       created_at: new Date(),
//       updated_at: new Date(),
//       user_id: currentUser ? currentUser.id : null,
//       location_id: event.location_id,
//       doctor_id:event.id 
//     };

//     this.visitService.createVisit(visit).subscribe(response => {
//       console.log('Event saved successfully:', response);
//     });
//   }

//   deleteEventFromServer(id: number) {
//     this.visitService.deleteVisit(id).subscribe(() => {
//       console.log('Event deleted successfully');
//     });
//   }
// }
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
import { VisitModelTs , Doctor} from '../../models/visit.model.ts';
import { createEventId } from './event-utils';
import { TokenService } from '../../services/token.service';
import { AddVisitDialogComponent } from '../add-visit-dialog/add-visit-dialog.component';
import { UpdateVisitDialogComponent } from '../update-visit-dialog/update-visit-dialog.component';

// @Component({
//   selector: 'app-uservisit',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, FullCalendarModule],
//   templateUrl: './uservisit.component.html',
//   styleUrls: ['./uservisit.component.css'],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
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
//           id: createEventId(),
//           title: result.purpose,
//           start: `${result.visit_date}T${result.visit_time}`,
//           allDay: false
//         };

//         calendarApi.addEvent(newEvent);
//         this.saveEventToServer(newEvent);
//       }
//     });

//     const calendarApi = this.calendarComponent.getApi();
//     calendarApi.unselect(); // clear date selection
//   }

//   handleEventClick(clickInfo: EventClickArg) {
//     const dialogRef = this.dialog.open(UpdateVisitDialogComponent, {
//       width: '400px',
//       data: {
//         id: clickInfo.event.id,
//         visit_date: clickInfo.event.startStr.split('T')[0],
//         visit_time: clickInfo.event.startStr.split('T')[1],
//         doctor_id: clickInfo.event.extendedProps['doctor_id'],
//         purpose: clickInfo.event.title,
//         status: clickInfo.event.extendedProps['status'],
//         location_id: clickInfo.event.extendedProps['location_id']
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         if (result.action === 'delete') {
//           this.deleteEventFromServer(result.id);
//         } else if (result.action === 'update') {
//           this.updateEventInCalendar(result);
//           this.updateEventToServer(result);
//         }
//       }
//     });
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
//             doctor_id: visit.doctor_id,
//             status: visit.status,
//             location_id: visit.location_id,
//             user_id: visit.user_id // Assuming you have user_id in your visit model
//           }
//         });
//       });
//     });
//   }

//   saveEventToServer(event: any) {
//     const currentUser = this.tokenService.getUserInfo();
//     const visit: VisitModelTs = {
//       id: Number(event.id),
//       purpose: event.title,
//       visit_date: event.start.split('T')[0],
//       visit_time: event.start.split('T')[1],
//       status: 'ongoing', // default status
//       created_at: new Date(),
//       updated_at: new Date(),
//       user_id: currentUser ? currentUser.id : null,
//       location_id:event.location_id,
//       doctor_id:event.doctor_id
//     };

//     this.visitService.createVisit(visit).subscribe(response => {
//       console.log('Event saved successfully:', response);
//     });
//   }

//   updateEventToServer(event: any) {
//     const visit: VisitModelTs = {
//       id: Number(event.id),
//       purpose: event.purpose,
//       visit_date: event.visit_date,
//       visit_time: event.visit_time,
//       status: event.status,
//       created_at: event.created_at,
//       updated_at: new Date(),
//       user_id: event.user_id,
//       location_id:event.location_id,
//       doctor_id:event.doctor_id
//     };

//     this.visitService.updateVisit(visit).subscribe(response => {
//       console.log('Event updated successfully:', response);
//     });
//   }

//   deleteEventFromServer(id: number) {
//     this.visitService.deleteVisit(id).subscribe({
//       next: () => {
//         console.log('Event deleted successfully');
//         const calendarApi = this.calendarComponent.getApi();
//         const event = calendarApi.getEventById(id.toString());
//         if (event) {
//           event.remove();
//         }
//       },
//       error: (err) => {
//         console.error('Error deleting event:', err);
//       }
//     });
//   }

//   updateEventInCalendar(event: any) {
//     const calendarApi = this.calendarComponent.getApi();
//     const calendarEvent = calendarApi.getEventById(event.id);
//     if (calendarEvent) {
//       calendarEvent.setProp('title', event.purpose);
//       calendarEvent.setStart(`${event.visit_date}T${event.visit_time}`);
//       calendarEvent.setExtendedProp('doctor_id', event.doctor_id);
//       calendarEvent.setExtendedProp('status', event.status);
//       calendarEvent.setExtendedProp('location_id', event.location_id);
//     }
//   }
// }






@Component({
  selector: 'app-uservisit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule],
  templateUrl: './uservisit.component.html',
  styleUrls: ['./uservisit.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
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
          id: createEventId(),
          title: result.purpose,
          start: `${result.visit_date}T${result.visit_time}`,
          allDay: false
        };

        calendarApi.addEvent(newEvent);
        this.saveEventToServer(newEvent);
      }
    });

    const calendarApi = this.calendarComponent.getApi();
    calendarApi.unselect(); // clear date selection
  }

  handleEventClick(clickInfo: EventClickArg) {
    const dialogRef = this.dialog.open(UpdateVisitDialogComponent, {
      width: '400px',
      data: {
        id: clickInfo.event.id,
        visit_date: clickInfo.event.startStr.split('T')[0],
        visit_time: clickInfo.event.startStr.split('T')[1],
        doctor_id: clickInfo.event.extendedProps['doctor_id'],
        purpose: clickInfo.event.title,
        status: clickInfo.event.extendedProps['status']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const calendarApi = this.calendarComponent.getApi();
        const event = calendarApi.getEventById(result.id);
        if (event) {
          event.setProp('title', result.purpose);
          event.setStart(`${result.visit_date}T${result.visit_time}`);
          event.setExtendedProp('doctor_id', result.doctor_id);
          event.setExtendedProp('status', result.status);
        }

        if (result.delete) {
          event!.remove();
          this.deleteEventFromServer(Number(clickInfo.event.id));
        } else if (event) {
          event.setProp('title', result.purpose);
          event.setStart(`${result.visit_date}T${result.visit_time}`);
          event.setExtendedProp('status', result.status);
          event.setExtendedProp('doctor_id', result.doctor_id);
        }
        this.updateEventToServer(result);
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
      visits.forEach(visit => {
        calendarApi.addEvent({
          id: visit.id.toString(),
          title: visit.purpose,
          start: `${visit.visit_date}T${visit.visit_time}`,
          allDay: false,
          extendedProps: {
            status: visit.status,
            doctor: visit.doctor[0]?.doctor_name,
          }
        });
      });
    });
  }

  saveEventToServer(event: any) {
    const currentUser = this.tokenService.getUserInfo();
    const visit: VisitModelTs = {
      id: Number(event.id),
      purpose: event.title,
      visit_date: event.start.split('T')[0],
      visit_time: event.start.split('T')[1],
      status: 'ongoing', // default status
      created_at: new Date(),
      updated_at: new Date(),
      user_id: currentUser ? currentUser.id : null,
      doctor: event.extendedProps.doctor,
      tools: [], // assuming you'll handle tools separately
    };

    this.visitService.createVisit(visit).subscribe(response => {
      console.log('Event saved successfully:', response);
    });
  }

  updateEventToServer(event: any) {
    const visit: VisitModelTs = {
      id: Number(event.id),
      purpose: event.purpose,
      visit_date: event.visit_date,
      visit_time: event.visit_time,
      status: event.status,
      created_at: event.created_at,
      updated_at: new Date(),
      user_id: event.user_id,
      doctor: event.doctor_id,
      tools: [], // assuming you'll handle tools separately
    };

    this.visitService.updateVisit(visit).subscribe(response => {
      console.log('Event updated successfully:', response);
    });
  }

  deleteEventFromServer(id: number) {
    this.visitService.deleteVisit(id).subscribe({
      next: () => {
        console.log('Event deleted successfully');
        this.loadEvents();
      },
      error: (err) => {
        console.error('Error deleting event:', err);
      }
    });
  }
}

