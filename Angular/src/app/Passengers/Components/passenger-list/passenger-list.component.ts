import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../passenger.service';
import { Passenger} from '../passenger.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent implements OnInit {
  passengerList: Passenger[];

  constructor(private service:PassengerService, private router: Router) { }

  ngOnInit(): void {
    console.log('CALLED: ');
    this.service.getPassenger().subscribe((passengerDetail: Passenger[]) => {
      this.passengerList = passengerDetail;
      console.log(passengerDetail);
    });
  }
 

 //on edit the passengers
  onEditClick(id: number){
    const passengerId = this.passengerList[id]['PassengerId'];
    this.router.navigate(['/Edit', passengerId]);
  }

//on delete the passengers
  onDeleteClick(id: number){
    const passengerId = this.passengerList[id]['PassengerId'];
    this.service.deletePassenger(passengerId.toString()).subscribe((response) => {
      console.log(response);
    });
    this.passengerList = [];
  }
}
