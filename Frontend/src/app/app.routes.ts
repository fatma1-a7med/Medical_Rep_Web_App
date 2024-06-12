import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddeditComponent } from './admin-dashboard/addedit/addedit.component';
import { ListallmedrepComponent } from './admin-dashboard/listallmedrep/listallmedrep.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ActivityMonitoringComponent } from './admin-dashboard/activity-monitoring/activity-monitoring.component';



export const routes: Routes = [
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/register', component: RegisterComponent },




  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'medreps', component: ListallmedrepComponent },
      {path :  'monitor' ,component:ActivityMonitoringComponent}

    ]
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },

  { path: '**', component: NotfoundComponent },
];



