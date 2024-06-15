import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './admin-dashboard/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ListallmedrepComponent } from './admin-dashboard/listallmedrep/listallmedrep.component';
import { AdminComponent } from './admin/admin.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the plugins you need

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HttpClientModule,
    ListallmedrepComponent,
    AdminComponent,
    RouterLink,
    FullCalendarModule
    
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-dashboard';
}
