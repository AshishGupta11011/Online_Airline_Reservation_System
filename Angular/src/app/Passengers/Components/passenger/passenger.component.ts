import { Component, OnInit } from '@angular/core';

import {  FormGroup ,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger } from '../../Models/passenger.model';
import { PassengerService } from '../../Services/passenger.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
////After that add below code which will be used to get the data from the service
export class PassengerComponent implements OnInit {

  //properties of passenger
  passengers: Passenger;
  
  //create property for reactive form
  newForm: FormGroup;

  constructor(private service : PassengerService, private router: Router)
   { 
     this.passengers;
    
     //create reactive form
     this.newForm=new FormGroup({
      'PassengerId': new FormControl(null, [Validators.required, Validators.min(100)]),
        'BookingId': new FormControl(null, [Validators.required, Validators.min(100)]),
        'EmailId': new FormControl(null, [Validators.email]),
        'Gender': new FormControl(null, [Validators.required, Validators.pattern('^[MFmf]$')]),
        'Name': new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z .]*$')]),
        'Age': new FormControl(null, [Validators.required, Validators.min(18)]),
        'Nationality': new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z .]*$')]),
     });
   }

  ngOnInit(): void {
  }
   //button methods
   //add button

     onAddClick() {
        let passenger: Passenger = {
          BookingId: this.newForm.get('BookingId').value,
          EmailId: this.newForm.get('EmailId').value,
          Gender: this.newForm.get('Gender').value,
          Name: this.newForm.get('Name').value,
          Age: this.newForm.get('Age').value,
          Nationality: this.newForm.get('Nationality').value.substring(0, 3)
        };
        console.log(this.newForm.value);
        this.service.addPassenger(passenger).subscribe(resData => {
          console.log(resData);
           alert('Passenger added successfully !');
        });
        this.newForm.reset();
        this.router.navigate(['/allpassengers']);

    //delete button
      //this.service.deletePassenger('109').subscribe(response => {
      //console.log(response);
    //});
   }
   //validation on booking id
   validateBookingId(control: FormControl): Observable<any> | Promise<any> {
     const promise = new Promise((resolve, reject) => {
       this.service.validateBookingId(control.value).subscribe(responseBookingId => {
       console.log(responseBookingId);
       if (responseBookingId.toString() === "007") {
         alert('The booking id already exists !');
         resolve({'valid': false});
       } else {
         resolve(null);
       }
     },
     (error) => {
       console.log(error.error.Message);
     });
    });
     return promise;
   }
}
