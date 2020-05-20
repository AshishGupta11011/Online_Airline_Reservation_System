using Airline_Reservation.web.Models;
using System.Collections.Generic;

namespace Airline_Reservation.web.Services
{
    /// <summary>
    /// created an interface that implements Booking Service Class
    /// </summary>
    public interface IBookings
    {
        List<Booking> GetAllBookings();
    }    
}
