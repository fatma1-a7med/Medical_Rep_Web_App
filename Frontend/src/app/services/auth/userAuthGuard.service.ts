import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserAuthServicesService } from '../user-auth-services.service';

export const UserGuard : CanActivateFn = (route, state) => {
  const localStorage = inject(UserAuthServicesService);
  const router = inject(Router);

  if(localStorage.getValue('id') === null){
    router.navigate(['/user/login']);
    return false;
  }
  else{
    console.log(localStorage);
    return true;
  }

  return true;
};

