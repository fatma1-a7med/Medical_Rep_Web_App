import { Component } from '@angular/core';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ShowDoctorComponent } from './show-doctor/show-doctor.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [ListDoctorsComponent,UpdateDoctorComponent,AddDoctorComponent,ShowDoctorComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  

}
