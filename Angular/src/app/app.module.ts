import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { BookingDataService } from './Bookings/Services/booking-data.service';
import { PassengerComponent } from './Passengers/Components/passenger/passenger.component';
import { PassengerListComponent } from './Passengers/Components/passenger-list/passenger-list.component';
import { SafePipe } from './Bookings/pipes/safe/safe.pipe';
import { BookingDeatilsComponent } from './Bookings/Component/booking-deatils/booking-deatils.component';
import { PassengerService } from './Passengers/Services/passenger.service';
import { RegisterService } from './Customers/Services/Register.service';
import { AuthenticateService } from './Customers/Services/Authenticate.service';
import { AuthGuard } from './Customers/Services/Guard/auth.guard';
import { TokenInterceptorService } from './Customers/Services/Interceptor/token-interceptor.service';
import { LoginCustomerComponent } from './Customers/Components/login-customer/login-customer.component';
import { RegisterCustomerComponent } from './Customers/Components/register-customer/register-customer.component';
import { BookingComponent } from './Customers/Components/booking/booking.component';
import { AdminComponent } from './Customers/Components/admin/admin.component';
import { PageNotFoundComponent } from './Customers/Components/page-not-found/page-not-found.component';
import { ProfileComponent } from './Customers/Components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PassengerComponent,
    PassengerListComponent,
    SafePipe,
    BookingDeatilsComponent,
    AppComponent,
    LoginCustomerComponent,
    RegisterCustomerComponent,
    BookingComponent,
    AdminComponent,
    PageNotFoundComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ],
  providers: [PassengerService, BookingDataService,RegisterService, AuthenticateService,AuthGuard,
    {provide: HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
  multi : true} ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
