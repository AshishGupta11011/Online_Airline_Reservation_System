//***************************************************************************************
//Developer: <Ashita Gaur>
//Create Date: <17th May,2020>
//Last Updated Date: <20th May,2020>
//Description:To perform Business logic and accordingly return response to Bookings.
//Task:CRUD with opreation with flight
//***************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BookingWebApi.Models;

namespace BookingWebApi.Controllers
{
    public class BookingsController : ApiController
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
        /// Takes booking data from user and matches with availible Flights.
        /// </summary>
        /// <param name="booking"> booking details as bookingobject</param>
        /// <returns>Saves data to database</returns>
        ///POST: api/Bookings
        [ResponseType(typeof(Booking))]
        public IHttpActionResult PostBooking(Booking booking)
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

        /// <summary>
        /// Deletes booking on the basis of booking Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns> Ok satus if that booking Deatils are deleted</returns>
        ///DELETE: api/Bookings/5
        [ResponseType(typeof(Booking))]
        public IHttpActionResult DeleteBooking(int id)
        {
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            db.Bookings.Remove(booking);
            db.SaveChanges();

            return Ok(booking);
        }

       
    }
}