import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-profile.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']

})

export class UserProfileComponent implements OnInit {
  userProfile: any=[]; // Variable to hold user profile data
  successMessage: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    
    this.messageService.message$.subscribe(message => {
      this.successMessage = message;
      setTimeout(() => this.successMessage = null, 3000); // Hide message after 3 seconds
    });
  }

  // Method to fetch user profile based on current user
  getUserProfile(): void {
    this.userService.getUserProfile()
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response) { // Check if response is successful
            this.userProfile.push(response);
            console.log(this.userProfile);
            if (this.userProfile) {
            // Assuming image path is relative and needs prefixing with server URL
            this.userProfile.image = `http://localhost:8000/images/${this.userProfile[0].image}`;
            }
          } else {
            console.error('No data found in API response or API error');
          }
        },
        (error) => {
          this.router.navigate(['/NotFound']);
          // Handle error as needed
        }
      );
  }
  
  // Method to navigate to update profile component
  navigateToUpdateProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
    this.router.navigate(['user/user-profile/update'], { queryParams: { token: token } });
  }else{
    console.error('Token not found');
    // Handle the case where token is not found
  }
  }
  }