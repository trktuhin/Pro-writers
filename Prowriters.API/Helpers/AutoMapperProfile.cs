using AutoMapper;
using Prowriters.API.Dtos;
using Prowriters.API.Models;

namespace Prowriters.API.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<OrderDto, Order>();
            CreateMap<MessageDto, Message>();
        }
    }
}