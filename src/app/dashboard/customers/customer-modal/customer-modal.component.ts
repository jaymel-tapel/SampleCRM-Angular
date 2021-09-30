import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
} from '@angular/animations';
import { CustomerFull, CustomerNoId, CustomerService } from 'src/app/core/services/customer.service';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common' ;


@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateX(0)',
      })),
      state('closed', style({
        transform: 'translateX(-100%)',
      })),
    ]),
  ]
})
export class CustomerModalComponent implements OnInit {

  @Input() isOpen = false;
  @Output() modalCloseEventEmitter = new EventEmitter<boolean>();
  @Output() formSaveEventEmitter = new EventEmitter<boolean>();

  // IF CURRENT USER ID IS NULL, FORM WILL BE USED FOR ADDING CUSTOMER
  // IF THE USER ID IS AVAILABLE, FORM WILL BE USED FOR UPDATING CUSTOMER DATA
  @Input() currentUserId:number|null = null;
  isLoading:boolean = false;
  errorMessage:string;

  birthdayInputType = '';
  
  customerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(private customerService:CustomerService, private toastr:ToastrService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.isOpen.currentValue == true && this.currentUserId == null) {
      this.customerForm.reset();      
      this.errorMessage = "";
      this.birthdayInputType = 'text';
    }

    if(changes.isOpen.currentValue == true && this.currentUserId != null) {
      this.isLoading = true;
      this.customerService.getCustomerById(this.currentUserId).pipe(take(1)).subscribe((res:any) => {
        this.customerForm.patchValue(res);
        this.birthdayInputType = 'date';
        let birthdate = new Date(res.birthday);
        this.customerForm.controls.birthday.setValue(formatDate(birthdate,'yyyy-MM-dd','en'));
        this.isLoading = false;
      }, (error) =>{
        this.isLoading = false;
        this.toastr.error("Failed to get customer data!");
      });
    }
  }



  onSubmitCustomerForm() {
    if(this.customerForm.valid) {
      // get the form data
      let customerAdd:CustomerNoId = 
      {
        firstName: this.customerForm.get("firstName")?.value,
        lastName: this.customerForm.get("lastName")?.value,
        email: this.customerForm.get("email")?.value,
        birthday: new Date(this.customerForm.get("birthday")?.value).toISOString(),
        phone: this.customerForm.get("phone")?.value,
        address: this.customerForm.get("address")?.value
      };

      let tempObs:Observable<any>;
      if(this.currentUserId) {
        // repurpose customer add form data for user update
        let customerUpdate:CustomerFull =
        {
          ...customerAdd,
          id: this.currentUserId
        };

        tempObs = this.customerService.updateCustomer(customerUpdate);
      } else {
        tempObs = this.customerService.addCustomer(customerAdd);
        this.isOpen = false;
        this.modalCloseEventEmitter.emit(false);
      }

      tempObs.pipe(take(1)).subscribe(res => {
        if(this.currentUserId) {
          this.toastr.success("Successfully updated customer!");
        } else {
          this.toastr.success("Successfully added customer!");
        }
        this.modalCloseEventEmitter.emit(false);
        this.formSaveEventEmitter.emit(true);
      }, (error) => {
        this.errorMessage = "Error submitting data!";
      });
    }
  }

  onClose() {
    this.modalCloseEventEmitter.emit(false);
  }

}
