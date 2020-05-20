using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Airline_Reservation.web.Models;
using System.Collections.Generic;

namespace Airline_Reservation.web.AirlineContracts
{
    /// <summary>
    ///  Interface that implements Booking Service
    /// </summary>
    public interface IBookings
    {
        List<Booking> GetAllBookings();
    }
}
