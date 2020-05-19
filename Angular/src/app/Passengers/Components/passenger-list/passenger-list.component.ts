import { Component, OnInit } from '@angular/core';
import { Passenger } from '../../Models/passenger.model';
import { PassengerService } from '../../Services/passenger.service';


@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent implements OnInit {
  passengerList: Passenger[];

  constructor( private service:PassengerService) { }

  ngOnInit(): void {
    this.service.getPassenger().subscribe((passengerDetail: Passenger[]) => {
      this.passengerList = passengerDetail;
    });
    // this.passengerDetails = this.service.passengerDetails;
    // console.log('TEST' + this.passengerDetails['PassengerId']);
    // console.log('TEST1' + this.passengerDetails.PassengerId);
  }
 

 //on edit the passengers
  onEditClick(){
   // this.service.editPassenger(PassengerId).subscribe(passengerDetail:passenger[]=>{ console.log(this.passengerDetails['PassengerId']);});
  }

//on delete the passengers
  onDeleteClick(){}

}
