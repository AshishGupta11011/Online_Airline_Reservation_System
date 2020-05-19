

export class Booking {
    
    FlightId: number;
    Class:string;
    Source: string;
    Destination: string;
    DateOfBooking: Date;
    DateOfJourney: Date;
    NoOfSeats: number;
    TicketFare: number;
    CustomerId: number;
    
    

    constructor(
        
        FlightId: number,
        Class: string,
        Source: string,
        Destination: string,
        DateOfBooking: Date,
        DateOfJourney: Date,
        NoOfSeats: number,
        TicketFare: number,
        CustomerId: number,
   
        

    ) {
       
        this.FlightId = FlightId;
        this.Class = Class;
        this.Source = Source;
        this.Destination = Destination;
        this.DateOfBooking = DateOfBooking;
        this.DateOfJourney = DateOfJourney;
        this.NoOfSeats = NoOfSeats;
        this.TicketFare = TicketFare;
        this.CustomerId = CustomerId;
        
        
    }
}