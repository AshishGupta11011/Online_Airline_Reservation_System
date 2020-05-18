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
using Airline_Reservation.web.Models;

namespace Airline_Reservation.web.Controllers
{
    /// <summary>
    /// Cancellation class derived from base class ApiController
    /// </summary>
    public class CancellationsController : ApiController
    {
        //Creation of DBContext class object
        private AirlineDBEntities db = new AirlineDBEntities();


        /// <summary>
        /// A method of controller that returns list of cancelled tickets
        /// </summary>
        /// <returns>List of Cancelled tickets</returns>
        // GET: api/Cancellations
        public IQueryable<Cancellation> GetCancellations()
        {
            return db.Cancellations;
        }


        /// <summary>
        /// A method of controller that returns only one entry based on incoming  cancellation id
        /// </summary>
        /// <param name="id">cancellation id the parameter</param>
        /// <returns>Returns a single entry from cancellation table</returns>
        // GET: api/Cancellations/5
        [ResponseType(typeof(Cancellation))]
        public IHttpActionResult GetCancellationById(long id)
        {
            //Creation of Cancellation class object
            Cancellation cancellation = db.Cancellations.Find(id);
            //Condition to check weather the obtained object is null or not
            if (cancellation == null)
            {
                return NotFound();
            }
            //returns the entry to the calling service of angular
            return Ok(cancellation);
        }


        /// <summary>
        /// A method of controller that updates the value of particular entry obtained by it's cancellation id
        /// </summary>
        /// <param name="id">Cacellation Id is the parameter</param>
        /// <param name="cancellation"></param>
        /// <returns>Returns a status code confirming the update</returns>
        // PUT: api/Cancellations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCancellation(long id, Cancellation cancellation)
        {
            //Checking whether the model passes to every validation applied
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Checks whether the incoming Id and the Id that is to be updated are equal or not
            if (id != cancellation.CancellationId)
            {
                return BadRequest();
            }

            //One amonng the five states of entity state that is being tracked by the entity for modification
            db.Entry(cancellation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CancellationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        /// <summary>
        /// A method of controller that inserts value into the cancellations table
        /// </summary>
        /// <param name="cancellation">Recieves an object from angular program that is to be inserted into the cancellation table</param>
        /// <returns>Returns an URI havinf default Api along with the Cancellation Id</returns>
        // POST: api/Cancellations
        [ResponseType(typeof(Cancellation))]
        public IHttpActionResult PostCancellation(Cancellation cancellation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Adds the object into the cancellation tablein database
            db.Cancellations.Add(cancellation);
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                //Calls the cancellationexists method to check whether the cancellation object is already present or not
                if (CancellationExists(cancellation.CancellationId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
           return CreatedAtRoute("DefaultApi", new { id = cancellation.CancellationId }, cancellation);
        }



        /// <summary>
        /// A method of controller that deletes a particular records from cancellation tables according to the incoming Cancellation id
        /// </summary>
        /// <param name="id">Receives an cancellation ID for checking in cancellation table</param>
        /// <returns>Returns an object to angular</returns>
        // DELETE: api/Cancellations/5
        [ResponseType(typeof(Cancellation))]
        public IHttpActionResult DeleteCancellation(long id)
        {
            Cancellation cancellation = db.Cancellations.Find(id);
            if (cancellation == null)
            {
                return NotFound();
            }

            db.Cancellations.Remove(cancellation);
            db.SaveChanges();

            return Ok(cancellation);
        }


        
        /// <summary>
        ///A method of controller that shows the details of cancelled tickets
        /// </summary>
        /// <param name="bookingId">Booking Id of the selected records is the parameter</param>
        /// <returns>Returns Ok status</returns>
        [HttpGet]
        [Route("api/Cancellations/CancellationDetails/{BookingId}")]
        public IHttpActionResult CancellationDetails(int bookingId)
        {
            Booking book = db.Bookings.Find(bookingId);
            if(book==null)
            {
                return BadRequest();
            }
            //checks whether booking is cancelled or not
            if(book.TicketStatus.Equals("CANC"))
            {
                return BadRequest("Booking Already Cancelled");
            }

            Cancellation can = new Cancellation() {
                FlightId = book.FlightId,
                BookingId = bookingId,
                DateOfCancellation = DateTime.Now,
                //checks whether date of journey is from which date
                RefundAmount= CalculationOfRefund(bookingId,book.DateOfJourney<=DateTime.Now ? 0:1)
           };
            db.Cancellations.Add(can);
            db.SaveChanges();
            //After adding the object to cancellation table, the status of booking will be updated to Cancelled in bookings table
            book.TicketStatus = "CANC";
            book.TicketFare = book.TicketFare - can.RefundAmount;
            db.SaveChanges();


            Flight flight = db.Flights.Find(can.FlightId);
            //To store null we are giving ?
            int? flightAvailableSeats = flight.AvailableSeats;
            int? noOfSeats = book.NoOfSeats;
            // Converting int? to int as Available Seats has integer datatype
            flight.AvailableSeats = (int)(flightAvailableSeats + noOfSeats);
            //updating the available seats in flight table
            db.SaveChanges();
             return Ok();

        }



        /// <summary>
        ///  Method to calculate the refund amount
        /// </summary>
        /// <param name="bookingId">Booking Id is the parameter which will fetch the total fare of ticket </param>
        /// <param name="flightStatus"></param>
        /// <returns>return refund amount</returns>
        private decimal CalculationOfRefund(int bookingId, int flightStatus)
        {
            decimal refund = 0;
            if (flightStatus == 0)
            {
                return refund;
            }
            else
                refund = (db.Bookings.Find(bookingId).TicketFare * 75) / 100;
            return refund;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }


        /// <summary>
        /// method to find whether the record exist in cancellation table or not
        /// </summary>
        /// <param name="id">Cancellation ID is the parameter</param>
        /// <returns>return bool value accordingly</returns>
        private bool CancellationExists(long id)
        {
            return db.Cancellations.Count(e => e.CancellationId == id) > 0;
        }
    }
}