//***************************************************************************************
//Developer: <Ashita Gaur>
//Create Date: <17th May,2020>
//Last Updated Date: <20th May,2020>
//Description:To Implement booking service.
//Task:CRUD with opreation with flight
//***************************************************************************************

using Airline_Reservation.web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Airline_Reservation.web.Services
{
    public class BookingService
    {
        private AirlineDBEntities db = new AirlineDBEntities();

        /// <summary>
        /// Shows All Bookings from database
        /// </summary>
        /// <returns>Data from Booking Table</returns>
        ///GET: api/Bookings
        public IQueryable<Booking> GetBookings()
        {
            return db.Bookings;
        }

        /// <summary>
        /// Shows All Bookings from database
        /// </summary>
        /// <returns>Data from Booking Table</returns>
        // GET: api/Bookings/5
        [ResponseType(typeof(Booking))]
        public IHttpActionResult GetBookingById(int id)
        {
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        /// <summary>
        /// Takes booking data from user and matches with availible Flights.
        /// </summary>
        /// <param name="booking"> booking details as bookingobject</param>
        /// <returns>Saves data to database</returns>
        ///POST: api/Bookings
        [ResponseType(typeof(Booking))]
        public IHttpActionResult UpdateBooking(Booking booking)
        {
            // Checks If there is destination and source is availible
            Flight flight = db.Flights.Where<Flight>(
                f => booking.Destination.Equals(f.Destination)
                && booking.Source.Equals(f.Source)
                ).First();

            // If data does not matches with flight data then it is null
            if (flight == null)
            {
                return BadRequest("Invalid Details");
            }

            // If AvailableSeats is less then user requuired seats then it does not stores data 
            if (booking.NoOfSeats > flight.AvailableSeats)
            {
                return BadRequest("Seats unavailable");
            }


            //Customer customer=db.Customers.Where<Flight>(
            //    f => booking.Destination.Equals(f.Destination)
            //    && booking.Source.Equals(f.Source)
            //    ).First();

            booking.FlightId = flight.FlightId;
            booking.CustomerId = 100;
            // Counts Ticket Fare
            booking.TicketFare = booking.NoOfSeats * 2000;

            // Sets Ticket Status
            booking.TicketStatus = "NOTC";
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Adds booking data to booking table 
            db.Bookings.Add(booking);
            //Save all cahnges made in the context in database
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = booking.BookingId }, booking);
        }

        internal Booking GetBookingsById(int bookingId)
        {
            throw new NotImplementedException();
        }
    }
}