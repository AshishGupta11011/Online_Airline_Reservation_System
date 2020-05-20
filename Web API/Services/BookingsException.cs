using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Airline_Reservation.web.Services
{
    public class BookingsException : Exception
    {
        public BookingsException()
        {
        }

        public BookingsException(string message) : base(message)
        {
        }

        public BookingsException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected BookingsException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}