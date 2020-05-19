import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
// import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router) { }
  addForm: FormGroup;
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      FlightName: ['', Validators.required],
      Source: ['', Validators.required],
      Destination: ['', Validators.required],
      AvailableSeats: ['', Validators.required],
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
    console.log(this.addForm.value)
    console.log("yha se nevigation")
    this.router.navigate(['/'])
}
}