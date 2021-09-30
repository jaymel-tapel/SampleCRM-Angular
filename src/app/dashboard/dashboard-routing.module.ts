import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { CustomersComponent } from './customers/customers.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent,
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'customers' },
        { path: 'customers', component: CustomersComponent },
        { path: 'my-account', component: MyAccountComponent }
      ]  
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
