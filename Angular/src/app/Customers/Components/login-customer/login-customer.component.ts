//-----------------------------------------------------------------------------------------
// Developer    :  ASHISH GUPTA
// File Name    :  login-customer.component.cs
// Create Date  :  <17th May,2020>
// Last Updated :  <20th May,2020>
// Description  :  Checks whether user is Authorized And respond accordingly
// ------------------------------------------------------------------------------------------


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../Services/Authenticate.service';
import { User } from '../../Models/User';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css']
})
export class LoginCustomerComponent implements OnInit {

  constructor(private authenticate : AuthenticateService, private router : Router) { }
  token = "";
  id : number;

  ngOnInit(): void {
  }
  UserCred:User = new User();

  onLogin()
  {
    //Method to Authenticate The User
    this.authenticate.AuthenticateUser(this.UserCred).subscribe(
     
      res => {
        localStorage.setItem("token",res)
        console.log(res);
        

        this.router.navigate(['/booking']);

      },
      error => {
        window.alert("Wrong User Credentials");
        console.log(error)
      }
    )
  }
}
