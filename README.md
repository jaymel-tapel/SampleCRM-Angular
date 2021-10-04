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
**Shared Module** contains Loading animation component and alert component\




## How to use

### App Configuration 
1. **npm install** to install dependencies
2. Edit apiURL environments property to your backend server URL
3. After installing dependenices and configuring apiURL, enter **ng serve** on your command line to test the app.

### Registration
1. On the login screen, click the **Create Account** button, fill up the registration form and submit. Once done, you will be automatically redirected to login page again.

### Login
1. Fill up the login form with your correction email and password. If successful, you will be redirected to the CRM dashboard. 

### Dashboard Overview
The dashboard contains the dashboard menu on the left side and the main content on the right. By default, you will be in the customers dashboard after login which shows a customer list table and a few controls like search/filter at the top. You can click the table headers to sort by which column you want and you can click the current active column to toggle the order from descending to ascending and vice versa.

### Adding Customer
Below the customer list table, you can find the **Add Customer** Button. If you click it, it will show the Add Customer Modal which contains a form which you can use to add a customer entry to the customer list. Just fill up the fields and click **Add Customer**.

### Editing Customer
If you want to edit a customer, click the pencil icon below the Actions column of the customer's entry row. It will show a similar modal for the customer's form but this time it has the customer's saved information. Change the fields you want to edit and click **Update Customer** button.

### Deleting Customer 
Beside the edit icon, you can find a trash can icon, if you click it, you will be asked to confirm if you want to delete the customer. Press okay if you are sure or cancel if not.



## To be added in the future
- User Profile and Change Password
- User list pagination
- Reset Password
- more unit tests!
