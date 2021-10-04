# SampleCRM-Angular
This project is built with:
- Angular 12.2.7
- Node 14.17.6
- npm 6.14.15
- @fortawesome/angular-fontawesome 0.9
- ngx-toastr 14.1.3

## Module List 
**Core Module** contains directives, guard, interceptor, services\
**Login Screen Module** contains login screen layout component, login component and register component \
**Dashboard Module** contains dashboard layout component, dashboard menu component and customers component\
**Shared Module** contains Loading animation component and alert component




## How to use

### How to run
1. **npm install** to install dependencies
2. Edit apiURL environments property to your backend server URL
3. After installing dependenices and configuring apiURL, enter **ng serve** on your command line to test the app.

### Registration
1. On the login screen, click the **Create Account** button, you be redirected to the registration page (http://localhost:4200/register).
2. Fill up the registration form and submit. 
3. Once done, you will be automatically redirected to login page again.

### Login
1. On the login screen (http://localhost:4200/login), fill up the login form with your correction email and password . 
3. If successful, you will be redirected to the CRM dashboard. 

### Dashboard Overview
The dashboard contains the dashboard menu on the left side and the main content on the right. By default, you will be in the Customers Dashboard after login which shows a customer list table with search/filter at the top. You can click the table headers to sort by which column you want and you can click the current active column to toggle the order from descending to ascending and vice versa.

### Adding Customer
1. Go to the Customers Dashboard (http://localhost:4200/dashboard/customers).
2. Below the customer list table, you can find the **Add Customer** Button.
3. Click it to show the Add Customer Modal which contains a form which you can use to add a customer entry to the customer list.
4. Just fill up the fields and click **Add Customer** to submit. The table should refresh automatically.

### Editing Customer
1. Go to the Customers Dashboard (http://localhost:4200/dashboard/customers).
2. If you want to edit a customer, click the pencil icon below the Actions column of the customer's entry row.
3. It will show a similar modal for the customer's form but this time it will load the customer's saved information.
4. Change the fields you want to edit and click **Update Customer** button.

### Deleting Customer 
1. Beside the edit icon, you can find a trash can icon, if you click it, you will be asked to confirm if you want to delete the customer. 
2. Press okay if you are sure to proceed or cancel if not.

## To be added in the future
- User Profile and Change Password
- User list pagination
- Reset Password
- more unit tests!
