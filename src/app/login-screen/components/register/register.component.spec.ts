import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService, RegistrationFormModel } from "src/app/core/services/auth.service";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Route } from "@angular/router";


describe('RegisterComponent', () => {
    let fixture:ComponentFixture<RegisterComponent>;
    let component:RegisterComponent;
    let formData:RegistrationFormModel;

    
    @Injectable()
    class MockAuthService {
        authenticate() {}
        register(registrationFormModel:RegistrationFormModel) {
            return of(new HttpResponse({status: 200}));
         }
        autoLogin() {}
        isCurrentUserTokenValid() {}
        logout() {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            imports: [
                HttpClientTestingModule, 
                RouterTestingModule.withRoutes(<Route[]>[
                    { path: 'login', redirectTo: '' }
                ]),
                BrowserAnimationsModule,
                ToastrModule.forRoot({}),
                ReactiveFormsModule
            ], 
            providers: [    
                ToastrService,
                {
                    provide: AuthService,
                    useClass: MockAuthService
                }
            ]
        });
        fixture = TestBed.createComponent(RegisterComponent); 
        component = fixture.componentInstance;
    })

    it('Form should be invalid and has error message', () => {
        formData = {
            email: "not real email",
            password: "1234",
            firstName: "john",
            lastName: "doe"
        };
       component.registerForm.patchValue(formData);
       fixture.detectChanges();
       component.onRegister();
       expect((component.registerForm.invalid) && (component.errorMessage != '')).toBeTrue();
    });

    it('Form should have no error message', () => {
        formData = {
            email: "mymail@test.com",
            password: "1234",
            firstName: "john",
            lastName: "doe"
        };
       component.registerForm.patchValue(formData);
       component.onRegister();
       fixture.detectChanges();
       expect((component.errorMessage == '')).toBeTrue();
    });
});
