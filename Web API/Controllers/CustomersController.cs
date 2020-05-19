using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using Airline_Reservation.web.Models;

namespace Airline_Reservation.web.Controllers
{
    public class CustomersController : ApiController
    {
        private AirLineDBEntities db = new AirLineDBEntities();

        // GET: api/Customers
        
        [Authorize]
        [ResponseType(typeof(IQueryable<Customer>))]
        public IHttpActionResult GetCustomers()
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims;
                var role = claims.Where(r => r.Type == "Email").FirstOrDefault()?.Value;
                if (role == "ashishguptaid@gmail.com")
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    return Ok(db.Customers);
                }
                else{ return Unauthorized(); }
            }
            else { return Unauthorized(); }

        }

        // GET: api/Customers/5
        [Authorize]
        [ResponseType(typeof(Customer))]
        public IHttpActionResult GetCustomer(int id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }
            db.Configuration.LazyLoadingEnabled = false;

            return Ok(customer);
        }


        // PUT: api/Customers/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer(int id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.CustomerId)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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
       

        // POST: api/Customers
        [ResponseType(typeof(Customer))]
        
        public IHttpActionResult PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if ((db.Customers.Count(c => c.Email == customer.Email)) == 0 )
            {

                db.Customers.Add(customer);
                db.SaveChanges();
                db.Configuration.LazyLoadingEnabled = false;

                return CreatedAtRoute("DefaultApi", new { id = customer.CustomerId }, customer);
            }
            else
            {
                return Conflict();
            }
        }

        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        [Authorize]
        public IHttpActionResult DeleteCustomer(int id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return db.Customers.Count(e => e.CustomerId == id) > 0;
        }
    }
}