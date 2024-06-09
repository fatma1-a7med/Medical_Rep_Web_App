import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddeditComponent } from './admin-dashboard/addedit/addedit.component';
import { ListallmedrepComponent } from './admin-dashboard/listallmedrep/listallmedrep.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: ListallmedrepComponent },
      { path: 'add-medrep', component: AddeditComponent },
    ]
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
];



