import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

 flightData=[{
  "ArrivalTime": "2002-03-02T13:13:13",
  "AvailableSeats": "20",
  "BaggageLimit": "10",
  "DepartureTime": "2000-03-02T11:11:11",
  "Destination": "del",
  "FlightId": "100",
  "FlightName": "AirIndia",
  "Source": "ind"
},
{
  "ArrivalTime": "2002-03-02T13:12:13",
  "AvailableSeats": "40",
  "BaggageLimit": "20",
  "DepartureTime": "2001-03-02T11:11:11",
  "Destination": "dli",
  "FlightId": "101",
  "FlightName": "Aier",
  "Source": "idg"
},{
  "ArrivalTime": "2002-03-02T13:13:13",
  "AvailableSeats": "20",
  "BaggageLimit": "10",
  "DepartureTime": "2000-03-02T11:11:11",
  "Destination": "del",
  "FlightId": "102",
  "FlightName": "AirIndia",
  "Source": "ind"
},
{
  "ArrivalTime": "2002-03-02T13:12:13",
  "AvailableSeats": "40",
  "BaggageLimit": "20",
  "DepartureTime": "2001-03-02T11:11:11",
  "Destination": "dli",
  "FlightId": "103",
  "FlightName": "Aier",
  "Source": "idg"
}]


add(){
  this.router.navigate(["add"]);
}

delete(FlightId){
  console.log(FlightId);
}


}
