using Airline_Reservation.web.Models;
using System.Collections.Generic;

namespace Airline_Reservation.web.Services
{
    /// <summary>
    ///  Interface that implements Booking Service
    /// </summary>
    public interface IBookings
    {
        List<Booking> GetAllBookings();
    }    
}
