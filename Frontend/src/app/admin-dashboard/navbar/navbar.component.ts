import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AddeditComponent } from '../addedit/addedit.component';
import { HttpClientModule } from '@angular/common/http'; 
import {MatDialog} from '@angular/material/dialog'
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { MatMenuTrigger } from '@angular/material/menu'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  medreps: any[] = [];
  loggedInAdmin: any;

  constructor(private _dialog: MatDialog,private adminService: AdminDashboardService) {}


  /* ngOnInit(): void {
    this.loadLoggedInAdmin();
  } */

  /* loadLoggedInAdmin(): void {
    this.adminService.getLoggedInAdmin().subscribe(
      admin => {
        this.loggedInAdmin = admin;
      },
      error => {
        console.error('Error fetching admin details:', error);
        // Handle error appropriately (e.g., show error message)
      }
    );
  } */
 
   
  }

