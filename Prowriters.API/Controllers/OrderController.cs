using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Prowriters.API.Data;
using Prowriters.API.Dtos;
using Prowriters.API.Models;

namespace Prowriters.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IProwritersRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;
        public OrderController(IProwritersRepository repo, IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
            _repo = repo;

        }
        public async Task<IActionResult> AddOrder(OrderDto dto)
        {
            var orderToAdd = _mapper.Map<Order>(dto);
            _repo.Add(orderToAdd);
            await _uow.Complete();
            return Ok();
        }
    }
}