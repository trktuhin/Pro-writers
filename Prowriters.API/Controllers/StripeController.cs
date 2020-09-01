using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Prowriters.API.Models;
using Stripe;
using Stripe.Checkout;

namespace Prowriters.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IConfiguration _configurationn;
        public StripeController(IConfiguration configurationn)
        {
            _configurationn = configurationn;

        }
        [HttpPost("session")]
        public IActionResult CreateCheckoutSession([FromBody]List<SessionItemOption> sessionItemOptions)
        {
            StripeConfiguration.ApiKey = _configurationn.GetSection("AppSettings:StripeSecretKey").Value;
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string>
            {
                "card"
            },
                LineItems = sessionItemOptions.Select(option => new SessionLineItemOptions
                {
                    Name = option.Name,
                    Description = option.Description,
                    Amount = option.Price * 100,  // our prices in the frontent are not based on the lowest unit but the lowest unit is swiss francs so we need to multiply with 100 since stripe expects the smallest unit
                    Currency = option.Currency,
                    Quantity = option.Quantity
                }).ToList(),
                SuccessUrl = _configurationn.GetSection("AppSettings:BaseDomain").Value + "card?session_id={CHECKOUT_SESSION_ID}", //the success redirect url to your client 
                CancelUrl = _configurationn.GetSection("AppSettings:BaseDomain").Value + "card?session_id=" //the cancel redirect url to your client 
            };
            var service = new SessionService();
            var session = service.Create(options);
            return Ok(new { sessionId = session.Id });
        }

    }
}