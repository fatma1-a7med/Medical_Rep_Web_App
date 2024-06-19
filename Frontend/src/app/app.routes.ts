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
import { ActivityMonitoringComponent } from './admin-dashboard/activity-monitoring/activity-monitoring.component';
import { ForgetpasswordComponent } from './admin/forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { SalesListComponent } from './admin-dashboard/sales/sales-list/sales-list.component';
import { SalesAddComponent } from './admin-dashboard/sales/sales-add/sales-add.component';
import { SalesEditComponent } from './admin-dashboard/sales/sales-edit/sales-edit.component';
import { SalesDetailsComponent } from './admin-dashboard/sales/sales-details/sales-details.component';
import { VisitManagementComponent } from './admin-dashboard/visit-managment/visit-managment.component';
import { LocationComponent } from './admin-dashboard/location/location.component';
import { ListAllSalesComponent } from './users/usersales/list-all-sales/list-all-sales.component';
import { UsersComponent } from './users/users.component';
import { SalesUserDetailsComponent } from './users/usersales/sales-details/sales-details.component';
import { UservisitComponent } from './users/uservisit/uservisit.component';




export const routes: Routes = [
  { path: 'password/email', component: ForgetpasswordComponent },
  { path: 'password/reset/:token', component: ResetPasswordComponent }, 


  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: ListallmedrepComponent },
      { path: 'add-medrep', component: AddeditComponent },
      {path: 'activitymonitor' , component:ActivityMonitoringComponent} ,
      
      { path: 'sales', component: SalesListComponent },
      { path: 'sales/add', component: SalesAddComponent },
      { path: 'sales/edit/:id', component: SalesEditComponent },
      { path: 'sales/details/:id', component: SalesDetailsComponent },
      {path: 'visit-managment', component:VisitManagementComponent},
      {path: 'loction-tracking', component:LocationComponent},

     

    
    ]
  },
 
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'reporting', component: ReportingComponent }, // Add this route

  {
    path: 'user',
    component: UsersComponent,
    children: [
      { path: '', component: UsersComponent },
      { path: 'sales', component: ListAllSalesComponent },
      { path: 'sales/details/:id', component: SalesUserDetailsComponent },
      {path:'plan', component:UservisitComponent}

    ]
  },

  { path: '**', component: NotfoundComponent }
   
 
];



