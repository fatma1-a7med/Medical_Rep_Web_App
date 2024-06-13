import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './admin-dashboard/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'; 
import {ListallmedrepComponent} from './admin-dashboard/listallmedrep/listallmedrep.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NotfoundComponent } from './notfound/notfound.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,HttpClientModule,ListallmedrepComponent, AdminComponent, RouterLink,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-dashboard';

 
}
