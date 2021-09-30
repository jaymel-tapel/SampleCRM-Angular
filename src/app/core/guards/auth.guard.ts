import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(private authService:AuthService, private router:Router, private toastr:ToastrService) {

    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if(this.authService.currentLoggedInUser == null) {
            this.router.navigate(['/']);
        } else {
            let today = new Date();
            let tokenExpiration = new Date(this.authService.currentLoggedInUser.Token.Expires);

            if(tokenExpiration.getTime() < today.getTime()) {
                this.authService.logout();
                this.toastr.warning("Session expired!");
                this.router.navigate(['/']);
            }
        }
        return true;
    }
}