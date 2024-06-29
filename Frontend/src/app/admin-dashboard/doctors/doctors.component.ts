import { Component } from '@angular/core';
import {  ListdoctorsComponent } from './list-doctors/list-doctors.component';
import {  ShowdoctorComponent } from './show-doctor/show-doctor.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../user/navbar/navbar.component';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [ListdoctorsComponent,ShowdoctorComponent ,SideBarComponent,RouterOutlet],  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  

}
