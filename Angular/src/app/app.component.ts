import { Component } from '@angular/core';
import { AuthenticateService } from './Customers/Services/Authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works';
  constructor(public authenticate : AuthenticateService){}
}
