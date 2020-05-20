
using System;
using System.Runtime.Serialization;

namespace Airline_Reservation.web.Services
{

    //BookingException is created 

    [Serializable]
    
    internal class BookingException : Exception
    {
        public BookingException()
        {
        }

        public BookingException(string message) : base(message)
        {
        }

        public BookingException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected BookingException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}