import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AddeditComponent } from '../addedit/addedit.component';
import { HttpClientModule } from '@angular/common/http'; 
import {MatDialog} from '@angular/material/dialog'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  medreps: any[] = [];

  constructor(private _dialog: MatDialog) {}


 
   
  }

