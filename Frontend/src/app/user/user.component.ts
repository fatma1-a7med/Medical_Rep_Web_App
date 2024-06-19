import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from '../admin-dashboard/navbar/navbar.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, NavbarComponent,FooterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
