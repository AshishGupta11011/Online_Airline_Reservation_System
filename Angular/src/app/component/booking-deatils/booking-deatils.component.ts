import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookingDataService } from 'src/app/services/booking-data.service';
import { Flight } from 'src/app/model/flight';

@Component({
  selector: 'app-booking-deatils',
  templateUrl: './booking-deatils.component.html',
  styleUrls: ['./booking-deatils.component.css']
})
export class BookingDeatilsComponent implements OnInit {
  showFlightDetails: boolean = true;
  showBookingContent: boolean = true;
  showBookingDetails: boolean = true;

  // pipe 
  //@Input() today;
  //properties
  bookings: Booking[];
  flights : Flight[];
  //create property for reactive form
  newForm: FormGroup;
  newFlightForm: FormGroup;
 

  //constructor
  constructor(private bookingsService: BookingDataService) {
    this.bookings = [];
    this.flights = [];
   
    // reactive form 
    this.newFlightForm = new FormGroup({
      
      FlightId: new FormControl(100,[Validators.required]),
      FlightName: new FormControl("FC"),
      Source: new FormControl("DEL", [Validators.required]),
      Destination: new FormControl("JAI", [Validators.required]),
      DepartureTime: new FormControl("2020-05-18T18:30:00.000Z"),
      ArrivalTime: new FormControl("2020-05-18T18:30:00.000Z",[Validators.required]),
      NoOfSeats: new FormControl(1,[Validators.max(5), Validators.min(1)]),
      BaggageLimit: new FormControl(50),
      AvailableSeats: new FormControl(10),
      
    });

    //reactive form
    this.newForm = new FormGroup({
      
      FlightId: new FormControl(100,[Validators.required]),
      Class: new FormControl("FC"),
      Source: new FormControl("DEL", [Validators.required]),
      Destination: new FormControl("JAI", [Validators.required]),
      DateOfBooking: new FormControl("2020-05-18T18:30:00.000Z"),
      DateOfJourney: new FormControl("2020-05-18T18:30:00.000Z",[Validators.required]),
      NoOfSeats: new FormControl(1,[Validators.max(5), Validators.min(1)]),
      TicketFare: new FormControl(5000),
      CustomerId: new FormControl(100),
      
    });


  }
  
  ngOnInit() {
    
   
  }

  // Directive for showing after button click after search 
  // public showFlightDetails:boolean = false;
  // public buttonName:any = 'Show';
  toggleSearch()
  { 

    // CHANGE THE Button
    if(this.showFlightDetails)  
        {this.onSearchClick();
      console.log("Search Clicked");
        }
    else
     console.log("Search Clicked Else Part");    

  }

  // Directive for showing after button click after booking
  toggleBooking()
  { 

    // CHANGE THE Button
    if(this.showBookingDetails)  
        {this.onSubmitClick();
      console.log("Submit Clicked");
        }
    else
     console.log("Submit Clicked Else Part");    

  }
  

  // Search Flight by id
  onSearchClick()
  {
    console.log(" Part");
    if (this.newForm.valid == true) {
      //this.bookingsService.searchFlightsToDatabase(this.newFlightForm.value.FlightId)
      this.bookingsService.searchFlightsByDestination(this.newFlightForm.value.Destination)
      .subscribe(
        error => console.log(error),
        data => console.log(data))
        ;
      //clear textboxes//
      this.newForm.reset();
    }
    else {
      console.log("Invalid data");
    }

  }
  
  onSubmitClick() {
    if (this.newForm.valid == true) {
      //accessing value of any form control (textbox etc.)
      console.log(
        "Source : " + this.newForm.value.Source +'\n' + 
        "Destination : " + this.newForm.value.Destination +'\n' +
        "Date Of Booking : " + this.newForm.value.DateOfBooking +'\n' +
        "Date of Joining : " + this.newForm.value.DateOfJourney +'\n' +
        "No of Seats : " + this.newForm.value.NoOfSeats);


      this.bookingsService.postBookingsToDatabase(this.newForm.value).subscribe(
        error => console.log(error),
        data => console.log(data))
        ;
      //clear textboxes
      this.newForm.reset();
    }
    else {
      console.log("Invalid data");
    }
  }

}
