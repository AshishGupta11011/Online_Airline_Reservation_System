import { NgModule } from '@angular/core';
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


const routes: Routes = [
    //ashish
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginCustomerComponent },
    { path: 'Register', component: RegisterCustomerComponent },
    { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'cancel/:bId', component: UserCancellationComponent },
    { path: 'cancelList', component: AdminCancellationComponent }
    { path: '**', component: PageNotFoundComponent },
    //end
  // { path: '', redirectTo: 'AddPassenger', pathMatch: 'full' },
  { path: 'AddPassenger', component: PassengerComponent },
  { path: 'PassengerList', component: PassengerListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
