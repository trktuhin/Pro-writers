using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Prowriters.API.Data;
using Prowriters.API.Dtos;
using Prowriters.API.Helpers;
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
        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrder(OrderDto dto)
        {
            var orderToAdd = _mapper.Map<Order>(dto);
            orderToAdd.OrderDate = DateTime.Now;
            _repo.Add(orderToAdd);
            await _uow.Complete();
            return Ok(orderToAdd.Id);
        }

        [HttpGet("PaymentConfirmation/{id}")]
        public async Task<IActionResult> ConfirmPayment(int id)
        {
            var orderInDb = await _repo.GetOrderById(id);
            orderInDb.IsPaymentReceived = true;
            await _uow.Complete();
            return Ok();
        }

        [HttpPost("GetAllOrders")]
        public async Task<IActionResult> GetAllOrders(OrderParams userParams)
        {
            var orders = await _repo.GetOrders(userParams);
            Response.AddPagination(orders.CurrentPage, orders.PageSize, orders.TotalCount, orders.TotalPages);
            return Ok(orders);
        }

        [HttpDelete("deleteOrder/{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var orderInDb = await _repo.GetOrderById(id);
            orderInDb.IsDeleted = true;
            await _uow.Complete();
            return Ok();
        }
    }
}