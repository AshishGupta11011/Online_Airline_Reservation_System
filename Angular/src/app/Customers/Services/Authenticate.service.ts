import { Injectable } from '@angular/core';

import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError} from "rxjs/operators"
import {throwError} from "rxjs"
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url :string = 'http://localhost:53981/api/Authenticate';

  constructor(private http : HttpClient ,private router : Router) { }


    AuthenticateUser(user : User)
    {
       return this.http.post<any>(this.url,user).pipe(catchError(this.errorHandler))
    }

    errorHandler(error:HttpErrorResponse)
    {
      return throwError(error)
    }
//isLoggedin
    Loggedin(){
      return !!(localStorage.getItem('token') )
      
    }

    getToken(){
      return localStorage.getItem('token');
    }

    Logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);

    }
  
}
