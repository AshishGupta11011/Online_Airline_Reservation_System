
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Passenger } from '../Models/passenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  passengerDetails: Passenger;

  constructor(private http: HttpClient) {}

  getPassenger() {
    return this.http.get<Passenger[]>('http://localhost:53981/api/Passengers');
  }

  addPassenger(passenger: Passenger) {
    return this.http.post('http://localhost:53981/api/Passengers', passenger);
  }

  deletePassenger(pid: string) {
    return this.http.delete('http://localhost:53981/api/Passengers/' + pid);
  }

  editPassenger(newPassenger: Passenger, pid: string) {
    return this.http.put('http://localhost:53981/api/Passengers?PId=' + pid, newPassenger);
  }
}