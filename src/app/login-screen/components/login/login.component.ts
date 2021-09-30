import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isSubmitting:boolean = false;
  isSubmitAttempted:boolean = false;
  errorMessage:string;
  authSubscription:Subscription;
  loginErrorSubscription:Subscription;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('',  Validators.required),
  });

  constructor(private router:Router, private authService:AuthService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.authSubscription =  this.authService.isAuthenticated$.subscribe((res:boolean) => {
      if(res) {
        this.isSubmitAttempted = false;
        this.isSubmitting = false;
        this.errorMessage = "";
        this.loginForm.reset();
        this.toastr.success("Login Success!");
        this.router.navigateByUrl("/dashboard");
      } else {
        this.isSubmitting = false;
      }
    });

    this.loginErrorSubscription = this.authService.loginError$.subscribe((res:HttpErrorResponse) => {
      if(res.status == 400) {
        this.errorMessage = "Invalid Email or Password!";
      } else if (res.status == 500) {
        this.errorMessage = "Server Error!";
      } else {
        this.errorMessage = "Server Error!";
      }
    });
  }

  onLogin(){
    this.isSubmitAttempted = true;
    if(this.loginForm.valid) {
        this.isSubmitting = true;
        this.authService.authenticate(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value);
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.loginErrorSubscription.unsubscribe();
  }



}
