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
    /// 
    /// </summary>
    public class PassengersController : ApiController
    {
        //
        private AirlineDBEntities db;


        /// <summary>
        /// 
        /// </summary>
        public PassengersController()
        {
            //
            db = new AirlineDBEntities();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        // GET: api/Passengers
        public IQueryable<Passenger> GetPassengers()
        {
            //
            return db.Passengers;
        }


        // GET: api/Passengers/5
        [ResponseType(typeof(Passenger))]
        public IHttpActionResult GetPassenger(long id)
        {
            Passenger passenger = db.Passengers.Find(id);
            if (passenger == null)
            {
                return NotFound();
            }

            return Ok(passenger);
        }

        // PUT: api/Passengers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPassenger(long id, Passenger passenger)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != passenger.PassengerId)
            {
                return BadRequest();
            }

            db.Entry(passenger).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassengerExists(id))
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

        // POST: api/Passengers
        [ResponseType(typeof(Passenger))]
        public IHttpActionResult PostPassenger(Passenger passenger)
        {
            //generate new passenger id
            if (db.Passengers.Count() == 0)
            {
                passenger.PassengerId = 100;
            }
            else
            {
                passenger.PassengerId = db.Passengers.Select(temp => temp.PassengerId).Max() + 1;
            }
            

            //check for validation
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //insert data into db
            db.Passengers.Add(passenger);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = passenger.PassengerId }, passenger);
        }

        // DELETE: api/Passengers/5
        [ResponseType(typeof(Passenger))]
        public IHttpActionResult DeletePassenger(long id)
        {
            Passenger passenger = db.Passengers.Find(id);
            if (passenger == null)
            {
                return NotFound();
            }

            db.Passengers.Remove(passenger);
            db.SaveChanges();

            return Ok(passenger);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PassengerExists(long id)
        {
            return db.Passengers.Count(e => e.PassengerId == id) > 0;
        }
    }
}