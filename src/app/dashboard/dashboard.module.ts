import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { CustomerModalComponent } from './customers/customer-modal/customer-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    CustomersComponent,
    MyAccountComponent,
    DashboardLayoutComponent,
    DashboardMenuComponent,
    CustomerModalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule
    // BrowserAnimationsModule
  ],
})
export class DashboardModule { }
