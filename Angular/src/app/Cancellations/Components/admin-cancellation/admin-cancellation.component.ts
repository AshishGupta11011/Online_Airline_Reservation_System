import { Component, OnInit } from '@angular/core';
import { UserCancellation } from '../../Models/cancellation.model';
import { CancellationService } from '../../Services/cancellation.service';


@Component({
  selector: 'app-admin-cancellation',
  templateUrl: './admin-cancellation.component.html',
  styleUrls: ['./admin-cancellation.component.css']
})
export class AdminCancellationComponent implements OnInit {
  cancellationList: UserCancellation[] = [];

  constructor(private cancelService: CancellationService) { }

  ngOnInit(): void {
    this.cancelService.getCancellationDetails().subscribe((cancelData: UserCancellation[]) => {
      this.cancellationList = cancelData;
      console.log(cancelData);
    });
  }
}
