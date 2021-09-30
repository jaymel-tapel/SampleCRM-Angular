import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faCaretDown, faCaretUp, faEdit, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CustomerBasicInfo, CustomerService, SortColumn, SortOrder } from 'src/app/core/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  faCaret = faCaretDown;

  currentSort:SortOrder|string = SortOrder.ascending;
  currentColumn:SortColumn|string  = SortColumn.id;
  filterKeyword = "";

  isCustomerModalOpen = false;
  selectedCustomerId:number|null = null;
  customerList:CustomerBasicInfo[] = [];
  isCustomerListLoading:boolean = true;
  customerFetchSubscription:Subscription;
  customerErrorSubscription:Subscription;

  constructor(private customerService:CustomerService,  private toastr:ToastrService) { }

  ngOnInit(): void {
    this.customerFetchSubscription = this.customerService.customersFetchSubject$.subscribe(res => {
        this.customerList = res;
        this.isCustomerListLoading = false;
    });

    this.customerErrorSubscription = this.customerService.customerRefreshError$.subscribe(res => {
      this.isCustomerListLoading = false;
      this.toastr.error("Error fetching customers!");
    });

    this.customRefreshCustomer();
  }

  ngOnDestroy(): void {
    this.customerFetchSubscription.unsubscribe();
  }

  customRefreshCustomer() {
    this.isCustomerListLoading = true;
    this.customerService.refreshCustomers(this.filterKeyword, this.currentSort, this.currentColumn);
  }
  onCustomerModalClose($event:boolean) {
    this.isCustomerModalOpen = $event;
    this.selectedCustomerId = null;
  }

  onCustomerModalFormSave($event:boolean) {
    this.customRefreshCustomer();
  }

  onOpenAddCustomer() {
    this.selectedCustomerId = null;
    this.isCustomerModalOpen = !this.isCustomerModalOpen;
  }

  onOpenEditCustomer(customerId:number) {
    this.selectedCustomerId = customerId;
    this.isCustomerModalOpen = !this.isCustomerModalOpen;
  }
  
  onDeleteCustomer(customerId:number) {
    if(window.confirm("Are you sure you want to delete this customer?")) {
      this.customerService.deleteCustomer(customerId).pipe(take(1)).subscribe(res => {
        this.toastr.success("Customer delete success!");
        this.customRefreshCustomer();
      }, (error) => {
        this.toastr.error("Failed to delete customer!");
      })
    }
  }

  onSort(columnName:string) {
    if(columnName != this.currentColumn) {
      this.currentColumn = columnName;
    } else {
      if(this.currentSort == SortOrder.ascending) {
        this.currentSort = SortOrder.descending;
      } else {
        this.currentSort = SortOrder.ascending;
      }
    }
    this.customRefreshCustomer();
  }

  onSubmitSearch() {
    this.customRefreshCustomer();
  }
}