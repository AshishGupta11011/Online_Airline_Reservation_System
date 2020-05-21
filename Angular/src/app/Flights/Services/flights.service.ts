import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { Flight } from '../Models/flight';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient: HttpClient) { }
  apiPrefix: string = "http://localhost:53981";

    getAllFlights(): Observable<Flight[]>
    {
      return this.httpclient.get<Flight[]>(this.apiPrefix + "/api/Flight")
    }

    getFlightById(flightid: number): Observable<Flight>
    {
      return this.httpclient.get<Flight>(this.apiPrefix + `/api/Flight?FlightId=${flightid}`);
    }

    AddFlight(flight: Flight)
    {
     return this.httpclient.post<Flight>(this.apiPrefix + "/api/Flight", flight);
    
    }
    UpdateFlight(flight:Flight)
    {
    return this.httpclient.put<Flight>(this.apiPrefix + "/api/Flight/UpdateFlight?FlightId=" + flight.FlightId, flight);
    }

    deleteFlight(flightid: number)
     {
    return this.httpclient.delete(this.apiPrefix + "/api/Flight?FlightId=" + flightid, { responseType: "text" });
     }

  


}
