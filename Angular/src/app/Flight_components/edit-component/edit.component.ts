import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
// import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'] 
})
export class EditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  EditForm: FormGroup;
  FlightId;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.FlightId = params.FlightId;
    })

    this.EditForm = this.formBuilder.group({
      FlightId: [],
      FlightName: ['', Validators.required],
      Source: ['', Validators.required],
      Destination: ['', Validators.required],
      AvailableSeats: ['', Validators.required],
      BaggageLimit: ['', Validators.required],
      ArrivalTime: ['', Validators.required],
      DepartureTime: ['', Validators.required]
    });
  }

  // updateform(form){
  //   console.log(form.value)
  // }

  onSubmit() {
    // this.apiService.createUser(this.addForm.value)
    //   .subscribe( data => {
    //     this.router.navigate(['list-user']);
    //   });
    this.EditForm.valid
    this.EditForm.markAllAsTouched();
    if (this.EditForm.invalid) {
      console.log("please enter all values")
      return;
    }
    console.log(this.EditForm.value)
    console.log("nevigation")
    this.router.navigate(['/'])
  }

}
