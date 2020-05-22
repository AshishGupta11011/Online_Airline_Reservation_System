import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private flightService: ApiService) { }
  addForm: FormGroup;
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      FlightName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]{3, 100}$/)]],
      Source: ['', Validators.required, Validators.pattern(/^[a-zA-Z ]{3, 100}$/)],
      Destination: ['', Validators.required, Validators.pattern(/^[a-zA-Z ]{3, 100}$/)],
      AvailableSeats:  ['', Validators.required, Validators.min(0), Validators.max(500), Validators.pattern(/^[1-9][0-9]+$/)],
      BaggageLimit: ['', Validators.required],
      ArrivalTime: ['', Validators.required],
      DepartureTime: ['', Validators.required]
    });
  }


  // add(form){
    
  //   console.log(this.addForm.value)
  // }

  onSubmit() {
    // this.apiService.createUser(this.addForm.value)
    //   .subscribe( data => {
    //     this.router.navigate(['list-user']);
    //   });
    this.addForm.valid
    this.addForm.markAllAsTouched();
    if (this.addForm.invalid) {
      console.log("please enter all values")

      return;
  }
    console.log(this.addForm.value);
    this.flightService.AddFlight(this.addForm.value).subscribe(resData => {
      console.log(resData);
    },
    (error: HttpErrorResponse) => {
      console.log(error.error.Message);
    });
    console.log("yha se nevigation");
    this.router.navigate(['/']);
}
}