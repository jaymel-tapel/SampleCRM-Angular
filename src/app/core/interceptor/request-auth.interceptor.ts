import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RequestAuthInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.authService.currentLoggedInUser) {
            let request = req.clone({
                headers: req.headers.set(
                  'Authorization',
                  "Bearer " + this.authService.currentLoggedInUser?.Token.Value
                )
            });
            return next.handle(request);
        }
        return next.handle(req);
    }
}

