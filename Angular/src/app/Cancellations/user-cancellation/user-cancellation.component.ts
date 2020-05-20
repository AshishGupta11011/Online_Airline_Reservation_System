import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CancellationService } from '../Services/cancellation.service';

@Component({
  selector: 'app-user-cancellation',
  templateUrl: './user-cancellation.component.html',
  styleUrls: ['./user-cancellation.component.css']
})
export class UserCancellationComponent implements OnInit {
  bookingId: string;

  constructor(private route: ActivatedRoute, private cancelService: CancellationService) { }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.params['bId'];
    this.cancelService.cancelTicket(this.bookingId).subscribe(response => {
      console.log(response);
      console.log("Done");
      alert('Ticket Cancelled Successfully !');
    },
    error => {
      alert(error.error.Message);
    });
  }

}
