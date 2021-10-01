import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, RegistrationFormModel } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSubmitting:boolean = false;
  isSubmitAttempted:boolean = false;
  errorMessage:string = '';

  constructor(private authService:AuthService, private toastr: ToastrService, private router:Router) { }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    
  }

  onRegister() {
    this.isSubmitAttempted = true;
    this.errorMessage = '';

    if(this.registerForm.valid) {
      let registrationFormData:RegistrationFormModel = {
        email: this.registerForm.get("email")?.value,
        password: this.registerForm.get("password")?.value,
        firstName: this.registerForm.get("firstName")?.value,
        lastName: this.registerForm.get("lastName")?.value
      }
  
        this.isSubmitting = true;
        this.authService.register(registrationFormData).subscribe(res => {
          this.isSubmitAttempted = false;
          this.isSubmitting = false;
          this.toastr.success("You can go use your account now to login.", "Registration Successful!");
          this.router.navigateByUrl("/login");
          this.registerForm.reset();
        }, 
        ((error:HttpErrorResponse) => {
          if(error.error?.Email) {
            this.errorMessage = error.error?.Email;
          }
          else {
            this.errorMessage = "Unable to connect to server";
          }
          this.isSubmitting = false;
        })
      );
    } else {
      this.errorMessage = "Please fill up all the required information";
    }
  }
}
