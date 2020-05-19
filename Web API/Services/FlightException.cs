//=============================================
//  Developer:	<Anshika Jindal>
//  Create date: <17th May,2020>
//  last updated date:<20th may,2020>
//  Description : To perform business logic and accordingly return response to FlightController
//  Task : CRUD operation with Flight
//=============================================

using System;
using System.Runtime.Serialization;

namespace Airline_Reservation.web.Services
{
    [Serializable]
    internal class FlightException : Exception
    {
        public FlightException()
        {
        }

        public FlightException(string message) : base(message)
        {
        }

        public FlightException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected FlightException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}