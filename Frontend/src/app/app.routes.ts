import { forgetpasswordComponent } from './user-auth/forgetpassword/forgetpassword.component';
import { ShowVisitComponent } from './admin-dashboard/visit-managment/show-visit/show-visit.component';
import { UserGuard } from './services/auth/userAuthGuard.service';
import { UserLocationComponent } from './user/user-location/user-location.component';
import { NgModule, Component } from '@angular/core';
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
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { SalesListComponent } from './admin-dashboard/sales/sales-list/sales-list.component';
import { SalesAddComponent } from './admin-dashboard/sales/sales-add/sales-add.component';
import { SalesEditComponent } from './admin-dashboard/sales/sales-edit/sales-edit.component';
import { SalesDetailsComponent } from './admin-dashboard/sales/sales-details/sales-details.component';
import { VisitManagementComponent } from './admin-dashboard/visit-managment/visit-managment.component';
import { LocationComponent } from './admin-dashboard/location/location.component';
import { UserLoginComponent } from './user-auth/user-login/user-login.component';
import { HomeComponent } from './user/home/home.component';
import { AuthService } from './services/auth.service';
import { SalesUserDetailsComponent } from './users/usersales/sales-details/sales-details.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ListAllSalesComponent } from './users/usersales/list-all-sales/list-all-sales.component';
import { ListDoctorsComponent } from './users/doctors/list-doctors/list-doctors.component';
import { ListdoctorsComponent } from './admin-dashboard/doctors/list-doctors/list-doctors.component';
import { AddDoctorComponent } from './users/doctors/add-doctor/add-doctor.component';
import { ShowDoctorComponent } from './users/doctors/show-doctor/show-doctor.component';
import { UservisitComponent } from './users/uservisit/uservisit.component';
import { AdminGuard } from './services/auth/admin-auh-guard.guard';
import { AdminProfileComponent } from './admin-dashboard/admin-profile/admin-profile.component';
import { UpdateProfileComponent } from './admin-dashboard/update-profile/update-profile.component';
import { UserProfileComponent } from './user/user-dashboard/user-profile/user-profile.component';
import { UpdateUserProfileComponent } from './user/user-dashboard/update-profile/update-profile.component';
import { AboutUsComponent } from './user/about-us/about-us.component';
import { ShowdoctorComponent } from './admin-dashboard/doctors/show-doctor/show-doctor.component';
import { AllToolsComponent } from './admin-dashboard/tools/all-tools/all-tools.component';
import { AddToolsComponent } from './admin-dashboard/tools/add-tools/add-tools.component';
import { UpdateToolsComponent } from './admin-dashboard/tools/update-tools/update-tools.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { ForgetpasswordComponent } from './admin/forgetpassword/forgetpassword.component';
import { resetPasswordComponent } from './user-auth/reset-password/reset-password.component';






export const routes: Routes = [
       //welcomig 
  {path:'',component:WelcomeComponent},


    //admin auth
    { path: 'admin/login', component: LoginComponent },  
    { path: 'admin/register', component: RegisterComponent },
    { path: 'password/email', component: ForgetpasswordComponent },
    { path: 'password/reset/:token', component: ResetPasswordComponent }, 
    { path: 'reporting', component: ReportingComponent }, 
  
 //user auth
 { path:'user/login', component:UserLoginComponent},
 { path: 'user/password/email', component: 
  forgetpasswordComponent
  },
  { path: 'user/password/reset/:token', component: resetPasswordComponent }, 


  
    //user routes
    {
      path: 'user',
      canActivate: [UserGuard],
      component:UserComponent,
      children: [

        { path: '', component: HomeComponent },
        { path: 'home', component: HomeComponent },
        {path:'userLocation', component:UserLocationComponent},
        
        //doctor
        { path: 'list-All-Doctors', component: ListDoctorsComponent },
        { path: 'show-doctor/:id', component: ShowDoctorComponent },
        { path: 'add-doctor', component: AddDoctorComponent },

        //user salles
        {path:'sales',component:ListAllSalesComponent},
        {path:'sales/details/:id',component:SalesUserDetailsComponent},
      
        //user plan
        
        {path:'plan', component:UservisitComponent},

    { path: 'user-profile', component: UserProfileComponent },
    { path: 'user-profile/update', component: UpdateUserProfileComponent },
  
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    

      ]
    },
  



  //admin-dahboard
  {
    path: 'admin-dashboard',
    canActivate:[AdminGuard],
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
      { path: 'show-visit/:id', component: ShowVisitComponent },
      {path: 'loction-tracking', component:LocationComponent},
      { path: 'reporting', component: ReportingComponent },
      { path: 'admin-profile', component: AdminProfileComponent },
      { path: 'update-profile/update', component: UpdateProfileComponent },

      { path: 'doctors', component: ListdoctorsComponent },
      { path: 'showdoctors/:id', component: ShowdoctorComponent },

      //tools
      {path:'alltools', component:AllToolsComponent},
      {path:'addtool', component:AddToolsComponent},
      {path:'updatetool', component:UpdateToolsComponent},


    ]
  },
  
 
  { path: '**', component: NotfoundComponent }
   
 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
