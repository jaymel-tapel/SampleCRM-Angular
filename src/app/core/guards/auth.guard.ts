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
            this.toastr.warning("Unauthorized access!");
            this.router.navigate(['/']);
            return false;
        } else {
            if(!this.authService.isCurrentUserTokenValid()) {
                this.authService.logout();
                this.toastr.warning("Session expired!");
                this.router.navigate(['/']);
                return false;
            }
        }
        return true;
    }
}
