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
    public class CancellationsController : ApiController
    {
        private AirlineDBEntities db = new AirlineDBEntities();

        // GET: api/Cancellations
        public IQueryable<Cancellation> GetCancellations()
        {
            return db.Cancellations;
        }

        // GET: api/Cancellations/5
        [ResponseType(typeof(Cancellation))]
        public IHttpActionResult GetCancellation(long id)
        {
            Cancellation cancellation = db.Cancellations.Find(id);
            if (cancellation == null)
            {
                return NotFound();
            }

            return Ok(cancellation);
        }

        // PUT: api/Cancellations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCancellation(long id, Cancellation cancellation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cancellation.CancellationId)
            {
                return BadRequest();
            }

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

        // POST: api/Cancellations
        [ResponseType(typeof(Cancellation))]
        public IHttpActionResult PostCancellation(Cancellation cancellation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cancellations.Add(cancellation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cancellation.CancellationId }, cancellation);
        }

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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CancellationExists(long id)
        {
            return db.Cancellations.Count(e => e.CancellationId == id) > 0;
        }
    }
}