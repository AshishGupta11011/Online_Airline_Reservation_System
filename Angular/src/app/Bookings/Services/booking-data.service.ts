//***************************************************************************************
//Developer: <Ashita Gaur>
//Create Date: <17th May,2020>
//Last Updated Date: <20th May,2020>
//Description:To perform Business logic and accordingly return response to Bookings.
//Task:CRUD with opreation with flight
//***************************************************************************************

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Booking } from '../model/booking';
import { Flight } from '../model/flight';
import { catchError } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {
  // updateEmployee(employee: Employee): Observable<Employee> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.put<Employee>(this.url + '/UpdateEmployeeDetails/', employee, httpOptions);
  // }
  

  constructor(private httpClient: HttpClient) { }

  apiPrefix: string = "https://localhost:44325/";

  // updateBookingsToDatabase(searchBookingId: number): Observable<Booking> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.httpClient.put<Booking>(this.apiPrefix + '/UpdateEmployeeDetails/', employee, httpOptions);
 
  // }


  /// <summary>
  /// get bookings data from database 
  /// </summary>
  /// <returns> Ok booking table data in html form</returns>

  getBookingsFromDatabase() {
    return this.httpClient.get(this.apiPrefix + `api/bookings`).pipe(catchError(this.errorHandler));
  }

  getBookingsById(bookingId: Number) {
    return this.httpClient.get(this.apiPrefix + `api/bookings/` + bookingId);
  }

  /// <summary>
  /// post Bookings To Database by bookings Object
  /// </summary>
  /// <param name="bookings"></param>
  /// <returns> Ok satus if that booking Deatils are deleted</returns>


  postBookingsToDatabase(bookings: Booking) {
    return this.httpClient.post<Booking>(this.apiPrefix + `api/bookings`, bookings).pipe(catchError(this.errorHandler));
  }

  // Any Error in this contex will be thrown by error handler
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status)
  }
}
