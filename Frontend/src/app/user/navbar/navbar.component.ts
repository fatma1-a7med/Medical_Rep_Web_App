import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user_services/user-services.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  medreps: any[] = [];
  first_name:string='';
  loading: boolean = true; 

  constructor(private userService:UserService) {}


  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.first_name = response.user.first_name;
        console.log('First Name:', this.first_name);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  logout() {
    this.userService.logout();
  }
  }