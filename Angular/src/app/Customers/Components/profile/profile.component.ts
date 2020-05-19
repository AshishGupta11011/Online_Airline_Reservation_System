import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { strict } from 'assert';
import { Customer } from '../../Models/Customer';
import { RegisterService } from '../../Services/Register.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id:number ;
  


  customerModel: Customer = new Customer();
  constructor(private custservice: RegisterService , private router : Router ) { 
    this.id = 100;
  }



  ngOnInit(): void {
    this.custservice.GetCustomerById(this.id).subscribe(
      req => { this.customerModel = req ;},
      error => {console.log(error)}
      )

  }

  
  UpdateCust() {

    this.custservice.UpdateCustmomer(this.id,this.customerModel)
      .subscribe(
        
        req => { console.log(req) ; window.alert("Customer Updated")},
        error => {console.log(error) ;}
         
      )
  }

  DeleteCust(){
    this.custservice.DeleteCustomer(this.id).subscribe(
      req => {console.log(req) ;  window.alert("Customer Deleted")},
      error => console.log(error)
      
    )
  }


}
