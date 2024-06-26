import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './admin-dashboard/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ListallmedrepComponent } from './admin-dashboard/listallmedrep/listallmedrep.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the plugins you need
import { SideBarComponent } from './admin-dashboard/side-bar/side-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageComponent } from './admin-dashboard/message/message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,RouterOutlet,NavbarComponent,HttpClientModule,ListallmedrepComponent, AdminComponent, RouterLink,WelcomeComponent,MessageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-dashboard';
}
