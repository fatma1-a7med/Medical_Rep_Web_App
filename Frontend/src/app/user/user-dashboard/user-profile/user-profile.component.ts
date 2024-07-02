import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user-profile.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: any = []; // Variable to hold user profile data
  successMessage: string | null = null;
  defaultImage: string = 'assets/images/default.jpg'; // Path to the default profile image

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    
    this.messageService.message$.subscribe(message => {
      if (message === 'Profile updated successfully') {
        this.getUserProfile(); // Refresh the profile data
      }
      this.successMessage = message;
      setTimeout(() => this.successMessage = null, 3000); // Hide message after 3 seconds
    });
  }

  // Method to fetch user profile based on current user
  getUserProfile(): void {
    this.userService.getUserProfile()
      .subscribe(
        (response: any) => {
          if (response) { // Check if response is successful
            this.userProfile.push(response);
            if (this.userProfile[0].image) {
              this.userProfile[0].image = `http://localhost:8000/images/${this.userProfile[0].image}`;
            } else {
              this.userProfile[0].image = this.defaultImage; // Set default image if no image is provided
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
    } else {
      console.error('Token not found');
      // Handle the case where token is not found
    }
  }
}
