import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs'
import { Booking } from '../Models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {

  constructor(private httpClient: HttpClient) { }

  apiPrefix: string = "http://localhost:53981/";

  //Search by flight name
  searchFlightsByDestination(Destination: string): Observable<any> {
    //return this.httpClient.get(this.apiPrefix + `api/bookings?Source=${Source}&Destination=${Destination}`).pipe(catchError(this.errorHandler));
    return this.httpClient.get(this.apiPrefix + `api/Flights?Destination=${Destination}`).pipe(catchError(this.errorHandler));

  }
  //Search by flight id 
  searchFlightsToDatabase(FlightId: number): Observable<any> {
    //return this.httpClient.get(this.apiPrefix + `api/bookings?Source=${Source}&Destination=${Destination}`).pipe(catchError(this.errorHandler));
    return this.httpClient.get(this.apiPrefix + `api/Flights?FlightId=${FlightId}`).pipe(catchError(this.errorHandler));

  }
  // post Bookings To Database
  postBookingsToDatabase(bookings: Booking) {
    return this.httpClient.post<Booking>(this.apiPrefix + `api/bookings`, bookings).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status)
  }
}
