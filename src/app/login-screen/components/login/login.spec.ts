import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService, RegistrationFormModel } from "src/app/core/services/auth.service";
import { LoginComponent } from "./login.component";
import { User } from "src/app/shared/models/User.model";
import { Subject } from "rxjs";
import { Injectable, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Route } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe('LoginComponent', () => {
    let fixture:ComponentFixture<LoginComponent>;
    let component:LoginComponent;
    let formData;

    class MockAuthService {
        currentLoggedInUser:User|null;
        isAuthenticated$:Subject<boolean> = new Subject();
        loginError$:Subject<HttpErrorResponse> = new Subject();

        authenticate(email:string, password:string) {
            if(email == "test@gmail.com" && password == "1234") {
                this.currentLoggedInUser = {
                    Email:"test@gmail.com",
                    FirstName:"john",
                    LastName:"doe",
                    Id:"1234",
                    Token:{
                        Value:"abcdefg",
                        Expires:"10/31/2021 1:11:57 AM"
                    }
                };
                this.isAuthenticated$.next(true);
            } else {
                this.currentLoggedInUser = null;
                this.isAuthenticated$.next(false);
                this.loginError$.next(new HttpErrorResponse({ status: 401 }));
            }
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                HttpClientTestingModule, 
                RouterTestingModule.withRoutes(<Route[]>[
                    { path: 'dashboard', redirectTo: '' }
                ]),
                SharedModule,
                ToastrModule.forRoot({}),
                ReactiveFormsModule,
                BrowserAnimationsModule
            ], 
            providers: [    
                ToastrService,
                {
                    provide: AuthService,
                    useClass: MockAuthService
                }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        });
        fixture = TestBed.createComponent(LoginComponent); 
        component = fixture.componentInstance;
    })

    it('Form should be invalid and has error message', () => {
        formData = {
            email: "not real email",
            password: "1234",
        };
       component.loginForm.patchValue(formData);
       component.ngOnInit();
       component.onLogin();
       fixture.detectChanges();
       expect(component.errorMessage == '').toBeFalse();
    });

    it('Form should be valid and has error message', () => {
        formData = {
            email: "test@gmail.com",
            password: "1234",
        };
       component.loginForm.patchValue(formData);
       component.ngOnInit();
       component.onLogin();
       fixture.detectChanges();
       expect(component.errorMessage == '').toBeTrue();
    });

   
});
