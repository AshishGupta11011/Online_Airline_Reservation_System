import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminCancellationComponent } from './admin-cancellation/admin-cancellation.component';
import { UserCancellationComponent } from './user-cancellation/user-cancellation.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminCancellationComponent,
    UserCancellationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
