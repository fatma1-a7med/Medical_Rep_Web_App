import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust the path as necessary
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  admin: any;

  constructor(private authService: AuthService, private tokenService: TokenService) { }


  ngOnInit(): void {
    this.admin = this.tokenService.getUserInfo();
    if (this.admin) {
      console.log(`Logged in user: ${this.admin.first_name} ${this.admin.last_name}`);
    }
  }
}
