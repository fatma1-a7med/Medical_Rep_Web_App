import { AdminAuthServiceService } from './../admin-auth-services.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AdminAuthServiceService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.getHeaders()) {
      return true;
    } else {
      // Navigate to the login page with extras
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}
