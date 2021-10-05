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
    this.authSubscription =  this.authService.isAuthenticatedSource.subscribe((res:boolean) => {
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

    this.loginErrorSubscription = this.authService.loginErrorSource.subscribe((res:HttpErrorResponse) => {
      if(res.status == 400 || res.status == 401) {
        this.errorMessage = "Invalid Email or Password!";
      }else {
        this.errorMessage = "Unable to connect to server";
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
