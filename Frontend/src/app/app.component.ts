import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './admin-dashboard/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'; 
import {ListallmedrepComponent} from './admin-dashboard/listallmedrep/listallmedrep.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NotfoundComponent } from './notfound/notfound.component';
import { SideBarComponent } from './admin-dashboard/side-bar/side-bar.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,RouterOutlet,NavbarComponent,HttpClientModule,ListallmedrepComponent, AdminComponent, RouterLink,UsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-dashboard';

 
}
