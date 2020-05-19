import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassengerComponent } from './passenger/passenger.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'AddPassenger', pathMatch: 'full'},
  { path: 'AddPassenger', component: PassengerComponent },
  { path: 'PassengerList', component: PassengerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
