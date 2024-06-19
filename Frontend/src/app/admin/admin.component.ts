import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RegisterComponent,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
