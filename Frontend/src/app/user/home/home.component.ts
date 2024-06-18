import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserAuthServicesService } from '../../services/user-auth-services.service';
import { User } from '../../services/profile.service';
import { SalesService } from '../../services/user_services/user-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userId: string | null = null;

  constructor(private userService: SalesService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserId().subscribe(
      response => {
        this.userId = response.user_id;
      },
      error => {
        console.error('Error fetching user ID:', error);
      }
    );
  }
}
