import { Component,OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { SalesService } from '../../services/user_services/user-services.service';
import { RouterLink,RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  first_name: string = '';
  last_name: string = '';
  image: string = '';

  constructor(private userService: SalesService) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.first_name = response.user.first_name;
        this.last_name = response.user.last_name;
        this.image = response.user.image; // Assuming this is the relative path to the image
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  getImageUrl(): string | null {
    return this.image ? `http://localhost:8000/images/${this.image}` : null;
  }
  
  

  logout() {
    this.userService.logout();
  }
}