import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    let check =this.authService.isAuthenticated()
    if (!check) {
      this.router.navigate(['/sign-in'])
    }
    return check;
  }

}