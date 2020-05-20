import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassengerComponent } from './Passengers/Components/passenger/passenger.component';
import { PassengerListComponent } from './Passengers/Components/passenger-list/passenger-list.component';
import { BookingComponent } from './Customers/Components/booking/booking.component';
import { AuthGuard } from './Customers/Services/Guard/auth.guard';
import { AdminComponent } from './Customers/Components/admin/admin.component';
import { LoginCustomerComponent } from './Customers/Components/login-customer/login-customer.component';
import { RegisterCustomerComponent } from './Customers/Components/register-customer/register-customer.component';
import { ProfileComponent } from './Customers/Components/profile/profile.component';
import { PageNotFoundComponent } from './Customers/Components/page-not-found/page-not-found.component';
import { AdminCancellationComponent } from './Cancellations/Components/admin-cancellation/admin-cancellation.component';
import { UserCancellationComponent } from './Cancellations/Components/user-cancellation/user-cancellation.component';
import { PassengerEditComponent } from './Passengers/Components/passenger-edit/passenger-edit.component';
import { ListOfCustomersComponent } from './Customers/Components/list-of-customers/list-of-customers.component';


const routes: Routes = [
    //ashish
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
    { path: 'booking', component: BookingComponent },
    
    { path: 'admin', component: AdminComponent },
    { path: 'login', component: LoginCustomerComponent },
    { path: 'Register', component: RegisterCustomerComponent },
    { path: 'Profile', component: ProfileComponent },
    {path : 'allpassengers' , component: PassengerListComponent},
    {path: 'editpassenger/:pId', component : PassengerEditComponent},
    {path: 'Customerslist', component : ListOfCustomersComponent},
    //end
  // { path: '', redirectTo: 'AddPassenger', pathMatch: 'full' },
  { path: 'AddPassenger', component: PassengerComponent },
  {path: 'Cancellationsadmin',component: AdminCancellationComponent},
  {path: 'Cancellationsuser' ,component: UserCancellationComponent },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
