//***************************************************************************************
//Developer: <Ashita Gaur>
//Create Date: <17th May,2020>
//Last Updated Date: <20th May,2020>
//Description:To perform Business logic and accordingly return response to Bookings.
//Task:To create methods, properties ,validations and 
//***************************************************************************************

import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from '../../Models/booking';
import { BookingDataService } from '../../Services/booking-data.service';

@Component({
  selector: 'app-booking-deatils',
  templateUrl: './booking-deatils.component.html',
  styleUrls: ['./booking-deatils.component.css']
})
export class BookingDeatilsComponent implements OnInit {



  // taking current date data
  todayDate: Date = new Date();

  // flight class drop down menu data
  flightClassEntries = [{
    name: "First Class",
    value: "F"
  },
  {
    name: "Business Class",
    value: "B"
  },
  {
    name: "Economy Class",
    value: "E"
  }]


  // data for city drop down menu 
  cityData = [{
    name: "Jaipur",
    value: "JAI"
  },
  {
    name: "Delhi",
    value: "DEL"
  },
  {
    name: "Pune",
    value: "PUN"
  },
  {
    name: "Mumbai",
    value: "MUM"
  },
  {
    name: "Kolkata",
    value: "KOL"
  }]

  //properties 
  bookings: Booking[];
  searchBookingId: number;


  //property for reactive form 
  newForm: FormGroup;



  //Filter source and destination drop down menu 
  filterDestArgs: boolean;
  filterSourceArgs: boolean;
  updateForm: FormGroup;
  isUpdateFormActive: boolean = false;
  // filterArgs: String = '';


  //constructor
  constructor(private bookingsService: BookingDataService, private router: Router) {

    //bookings object aaray 
    this.bookings = [];

    //reactive form for updated booking data
    this.updateForm = new FormGroup({
      BookingId: new FormControl(0),
      Class: new FormControl(this.flightClassEntries[0].value),
      Source: new FormControl("", [Validators.required]),
      Destination: new FormControl("", [Validators.required]),
      DateOfBooking: new FormControl(this.todayDate),
      DateOfJourney: new FormControl(this.todayDate, [Validators.required]),
      NoOfSeats: new FormControl(1, [Validators.max(5), Validators.min(1)]),
    });


    //reactive form for booking data
    this.newForm = new FormGroup({
      Class: new FormControl(this.flightClassEntries[0].value),
      Source: new FormControl("", [Validators.required]),
      Destination: new FormControl("", [Validators.required]),
      DateOfBooking: new FormControl(this.todayDate),
      DateOfJourney: new FormControl(this.todayDate, [Validators.required]),
      NoOfSeats: new FormControl(1, [Validators.max(5), Validators.min(1)]),
    });
  }

  @HostListener('document:click', ['$event']) onMouseEnter(event) {
    // console.log(event.target.id);
    if (event.target.id != "sourceSearch") {
      this.filterSourceArgs = this.filterSourceArgs ? false : false;
    }
    else if (event.target.id != "destSearch") {
      this.filterDestArgs = this.filterDestArgs ? false : false;
    }
  }
  updateClickHandler() {
    this.isUpdateFormActive = true;
  }
  updateCityData(of: string, data) {
    if (of == 'from') {
      this.newForm.controls.Source.setValue(data.value);
    }
    else {
      this.newForm.controls.Destination.setValue(data.value);
    }
    this.autoCompleteClose();
  }
  autoCompleteClose() {
    this.filterSourceArgs = this.filterDestArgs = false;
  }
  setArgsTrue(of: string) {
    if (of == 'from') {
      this.filterSourceArgs = true;
      this.filterDestArgs = false;
    }
    else {
      this.filterSourceArgs = false;
      this.filterDestArgs = true;
    }
  }


  //
  ngOnInit() {


  }
  
  /// update  booking details 

  //Posting Booking Deatils to Database
  onSubmitClick() {
    if (this.newForm.valid == true) {
      //accessing value of any form control (textbox etc.)
      // console.log('Form Value: ' + this.newForm.value);

      this.bookingsService.postBookingsToDatabase(this.newForm.value).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      //clear textboxes
      this.newForm.reset();
      this.newForm.markAsDirty();
      this.newForm.controls.DateOfBooking.setValue(this.todayDate);
      this.newForm.controls.Class.setValue(this.flightClassEntries[0].value);
      this.newForm.controls.NoOfSeats.setValue(1);
    }
    else {
      console.log("Invalid data");
      // this.onDetailsClick();
    }
  }

  //Finding Status by Id
  onFindStatusClick() {
    console.log(this.searchBookingId);
    this.bookingsService.getBookingsById(this.searchBookingId).subscribe(data => {
      var obj: any
      obj = data as Booking[];
      if (obj.length) {
        this.bookings = obj;
      }
      else {
        this.bookings = [];
        this.bookings.push(obj);
      }
      this.updateForm.controls.BookingId.setValue(this.bookings[0].BookingId ? this.bookings[0].BookingId : 100);
      this.updateForm.controls.Class.setValue(this.bookings[0].Class ? this.bookings[0].Class : 'F');
      this.updateForm.controls.NoOfSeats.setValue(this.bookings[0].NoOfSeats ? this.bookings[0].NoOfSeats : 1);
      this.updateForm.controls.DateOfJourney.setValue(this.bookings[0].DateOfJourney ? this.bookings[0].DateOfJourney : this.todayDate);
      this.updateForm.controls.Destination.setValue(this.bookings[0].Destination ? this.bookings[0].Destination : 'DEL');
      this.updateForm.controls.Source.setValue(this.bookings[0].Source ? this.bookings[0].Source : 'JAI');
      // console.log('Data: ' + data);
      // console.log(this.bookings);
    },
      error => console.log(error));
    // console.log("Getting data from database");


  }
  checkButton() {
    if (this.searchBookingId == undefined && this.searchBookingId < 100) {
      return true;
    }
    else
      return false;
  }
  // getting  all booking data from database
  onDetailsClick() {
    //  To navigate to the bookings page
    //this.router.navigate(['/booking']);
    this.bookingsService.getBookingsFromDatabase().subscribe(data => {
      this.bookings = data as Booking[];
      console.log('Data: ' + data);
      console.log(this.bookings);
    },
      error => console.log(error));
    console.log("Getting data from database");
  }
  onClassChange(event) {
    this.newForm.controls.Class.setValue(event);
    console.log(this.newForm.controls.Class.value);

  }
  onUpdateBookingClick() {
    if (this.updateForm.valid == true) {
      //accessing value of any form control (textbox etc.)
      // console.log('Form Value: ' + this.newForm.value);

      this.bookingsService.updateBookingsToDatabase(this.updateForm.value.BookingId, this.updateForm.value).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      //clear textboxes
      this.updateForm.reset();
      this.updateForm.controls.DateOfBooking.setValue(this.todayDate);
      this.updateForm.controls.Class.setValue(this.flightClassEntries[0].value);
      this.updateForm.controls.NoOfSeats.setValue(1);
    }
    else {
      console.log("Invalid data");
      // this.onDetailsClick();
    }

  }
}
