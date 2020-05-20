using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Airline_Reservation.web.Services
{
    /// <summary>
    /// Exception class that represents exception while processing Bookings table
    /// </summary>
    public class BookingsException : Exception
    {
        public BookingsException()
        {
        }

        public BookingsException(string message) : base(message)
        {
        }
    }
}