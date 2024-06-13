import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddeditComponent } from './admin-dashboard/addedit/addedit.component';
import { ReportingComponent } from './admin/reporting/reporting.component';
import { ListallmedrepComponent } from './admin-dashboard/listallmedrep/listallmedrep.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';




export const routes: Routes = [
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: ListallmedrepComponent },
      { path: 'add-medrep', component: AddeditComponent }

    ]
  },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'reporting', component: ReportingComponent }, // Add this route
  { path: '**', component: NotfoundComponent }



  
];



