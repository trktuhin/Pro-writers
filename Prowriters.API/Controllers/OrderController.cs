using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
        private readonly IHostingEnvironment _env;
        public OrderController(IProwritersRepository repo, IMapper mapper, IUnitOfWork uow,
                                IHostingEnvironment env)
        {
            _uow = uow;
            _mapper = mapper;
            _repo = repo;
            _env = env;

        }
        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrder([FromForm]OrderDto dto)
        {
            var orderToAdd = _mapper.Map<Order>(dto);
            orderToAdd.OrderDate = DateTime.Now;
            if (dto.DocFile != null)
            {
                string[]  acceptedFileTypes = {".doc",".txt",".docx",".pdf",".html",".xml"};
                if (dto.DocFile.Length > 10485760) return BadRequest("Maximum size exceeded");
                if (!(acceptedFileTypes.Any(s => s == Path.GetExtension(dto.DocFile.FileName).ToLower())))
                {
                    return BadRequest("Invalid file type");
                }
                await UploadFile(dto.DocFile, orderToAdd);
            }
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
        [Authorize]
        public async Task<IActionResult> GetAllOrders(OrderParams userParams)
        {
            var orders = await _repo.GetOrders(userParams);
            Response.AddPagination(orders.CurrentPage, orders.PageSize, orders.TotalCount, orders.TotalPages);
            return Ok(orders);
        }

        [HttpDelete("deleteOrder/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var orderInDb = await _repo.GetOrderById(id);
            orderInDb.IsDeleted = true;
            await _uow.Complete();
            return Ok();
        }

        [HttpGet("markAsComplete/{id}")]
        [Authorize]
        public async Task<IActionResult> MarkAsComplete(int id)
        {
            var orderInDb = await _repo.GetOrderById(id);
            orderInDb.IsCompleted = true;
            await _uow.Complete();
            return Ok();
        }

        private async Task UploadFile(IFormFile docFile, Order order)
        {
            var uploadFolderPath = Path.Combine(_env.WebRootPath, "images");
            //creating folder if doesn't exist
            if (!Directory.Exists(uploadFolderPath))
            {
                Directory.CreateDirectory(uploadFolderPath);
            }
            //removing existing filePath
            if (!string.IsNullOrEmpty(order.FilePath))
            {
                var existingFilePath = Path.Combine(uploadFolderPath, order.FilePath);
                System.IO.File.Delete(existingFilePath);
            }
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(docFile.FileName);
            var filePath = Path.Combine(uploadFolderPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await docFile.CopyToAsync(stream);
            }
            order.FilePath = fileName;
        }
    }
}