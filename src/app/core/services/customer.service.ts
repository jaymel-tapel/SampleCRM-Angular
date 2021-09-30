import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  customerList:CustomerBasicInfo[] = [];
  public customersFetchSubject$ = new Subject<CustomerBasicInfo[]>();
  public customerRefreshError$ = new Subject<HttpErrorResponse>();

  refreshCustomers(filterKeyword:string|null = null, sortOrder:SortOrder|string|null = null, sortColumn:SortColumn|string|null = null) {
    let body = {
      FilterKeyword: filterKeyword,
      SortOrder: sortOrder,
      SortColumn: sortColumn
    };
    this.http.post(
      environment.apiURL + '/api/customer/getall',
      body
    ).pipe(take(1)).subscribe((res:any) => {
      this.customersFetchSubject$.next(res);
    }, (error) => {
      this.customerRefreshError$.next(error);
    })
  }

  addCustomer(customerAdd:CustomerNoId) {
    let body = customerAdd;
    return this.http.post(
      environment.apiURL + '/api/customer/add',
      body
    );
  }

  getCustomerById(id:number) {
    return this.http.post(
      environment.apiURL + '/api/customer/get/' + id,
      null
    );
  }

  updateCustomer(customerUpdate:CustomerFull) {
    let body = customerUpdate;
    return this.http.post(
      environment.apiURL + '/api/customer/update',
      body
    );
  }

  deleteCustomer(id:number) {
    return this.http.post(
      environment.apiURL + '/api/customer/delete/' + id,
      null
    );
  }
}

export enum SortColumn {
  id = "Id",
  firstName = "FirstName",
  lastName = "LastName",
  email = "Email",
  custCode = "CustCode",
}

export enum SortOrder {
  ascending = "ASC",
  descending = "DESC"
}

export class CustomerBase {
  lastName:string;
  firstName:string;
  email:string;
}
export class CustomerNoId extends CustomerBase
{
      birthday:string;
      phone?:string;
      address?:string;
}
export class CustomerFull extends CustomerNoId
{
    id:number;
}

export class CustomerBasicInfo extends CustomerBase
{
    custCode:string;
    id:number;
}