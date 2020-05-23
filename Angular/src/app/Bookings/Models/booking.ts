//***************************************************************************************
//Developer: <Ashita Gaur>
//Create Date: <17th May,2020>
//Last Updated Date: <20th May,2020>
//Description:To perform Business logic and accordingly return response to Bookings.
//Task:To create booking model.
//***************************************************************************************


export class Booking {
    BookingId?: number;
    Class:string;
    Source: string;
    Destination: string;
    DateOfBooking: Date;
    DateOfJourney: Date;
    NoOfSeats: number;
    constructor(
        Class: string,
        Source: string,
        Destination: string,
        DateOfBooking: Date,
        DateOfJourney: Date,
        NoOfSeats: number,
   ) {
        this.Class = Class;
        this.Source = Source;
        this.Destination = Destination;
        this.DateOfBooking = DateOfBooking;
        this.DateOfJourney = DateOfJourney;
        this.NoOfSeats = NoOfSeats;   
    }
}