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
import { UserLoginComponent } from './user-auth/user-login/user-login.component';
import { UserComponent } from './user/user.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserAuthGuard } from './services/user-auth-gard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,FormsModule,CommonModule,RouterOutlet,NavbarComponent,HttpClientModule,RouterLink
    ,ListallmedrepComponent, AdminComponent,UserAuthComponent,UserComponent
   ],
  providers: [
    UserAuthGuard,
    AdminAuthGuard 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-dashboard';

 
}
