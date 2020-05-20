//***************************************************************************************
//Developer: <Ashita Gaur>
//Create Date: <17th May,2020>
//Last Updated Date: <20th May,2020>
//Description:To perform Business logic and accordingly return response to Bookings.
//Task:CRUD with opreation with booking
//***************************************************************************************

using Airline_Reservation.web.Models;
using Airline_Reservation.web.Services;

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


namespace Airline_Reservation.web.Controllers
{

    public class BookingsController : ApiController
    {

        //declare BookingService type instance variable
        BookingService bs;
        BookingController ()
        {
            bs = new BookingService();
        }
        public List<Booking> GetAllBooking()
        {
            try
            {
                 
                List<Booking> bookingList = fs.GetBookings();

                //return the response
                return bookingList;
            }
            catch (BookingException)
            {
                //rethrow
                throw;
            }
        }
        public Booking GetBookingsById(int bookingId)
        {
            //check the validity of the input
            if (ModelState.IsValid)
            {
                try
                {
                    
                    Booking flt = fs.GetBookingById(bookingId);

                    //return the response
                    return flt;
                }
                catch (BookingException)
                {
                    //rethrow
                    throw;
                }
            }

            else
            {
                //throw user defined exception object 
                throw new BookingException("The entered details to fetch the bookings are not valid");
            }
        }

        /// <summary>
        /// Method updates or edits the changes of the passed booking in the booking table
        /// </summary>
        /// <param name="booking">object of type booking</param>
        /// <returns>boolean value</returns>
        public bool UpdateBooking(Booking booking)
        {
            //check the validity of the input
            if (ModelState.IsValid)
            {
                try
                {

                    //Call AddBooking method to fetch all Food Items 
                    bool isUpdated = fs.UpdateBooking(booking);

                    //return the response
                    return isUpdated;
                }
                catch (BookingException)
                {
                    //rethrow
                    throw;
                }
            }
            else
            {
                //throw user defined exception object 
                throw new BookingException("The entered details to fetch the Booking are not valid");
            }
        }


    }
}