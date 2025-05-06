import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'; // Librería para trabajar con JWT
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const user = this.userService.getCookie('user')||{} as any; // O usa cookies si es necesario
    
    if (user.token && !this.jwtHelper.isTokenExpired(user.token)) {
      return true; 
    }

    this.router.navigate(['/login']);
    return false;
  }
}
