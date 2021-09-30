import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginScreenLayoutComponent } from "./login-screen/components/login-screen-layout/login-screen-layout.component";
import { LoginComponent } from "./login-screen/components/login/login.component";
import { RegisterComponent } from "./login-screen/components/register/register.component";
import { LoginScreenModule } from "./login-screen/login-screen.module";

const routes: Routes = [
    { path: '', component: LoginScreenLayoutComponent,
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'login' },
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent}
      ]
    },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  ];
    
@NgModule({
  imports: [LoginScreenModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }