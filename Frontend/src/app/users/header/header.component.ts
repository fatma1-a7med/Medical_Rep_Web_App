import { Component } from '@angular/core';
import { DoctorsComponent } from '../doctors/doctors.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DoctorsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
