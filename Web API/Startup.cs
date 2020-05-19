using System;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security;
using Owin;
using AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode;


[assembly: OwinStartup(typeof(Airline_Reservation.web.Startup))]

namespace Airline_Reservation.web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {

                    AuthenticationMode = AuthenticationMode.Active,
                    TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "www.mysite.com",
                        ValidAudience = "www.mysite.com",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ashish1234jhagkgdjgdfkjagfddhldfkughlkjdsahgkjg"))
                    }

                }); ;
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
           
        }
    }
}
