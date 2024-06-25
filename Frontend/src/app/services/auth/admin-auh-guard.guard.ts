import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AdminAuthServiceService } from '../admin-auth-services.service';


export const AdminGuard: CanActivateFn = (route, state) => {


  const localStorage = inject(AdminAuthServiceService);
  const router = inject(Router);

  if(localStorage.getValue('user_id') === null){
    router.navigate(['/admin/login']);
    return false;
  }
  else{
    console.log(localStorage);
    return true;
  }

  return true;
};

