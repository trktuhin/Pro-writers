using System;
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

    public class ContactController: ControllerBase
    {
        private readonly IProwritersRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;
        public ContactController(IProwritersRepository repo, IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost("AddMessage")]
        public async Task<IActionResult> AddOrder(MessageDto dto)
        {
            var messageToAdd = _mapper.Map<Message>(dto);
            messageToAdd.MessageDate = DateTime.Now;
            _repo.Add(messageToAdd);
            await _uow.Complete();
            return Ok(messageToAdd.Id);
        }

        [HttpPost("GetAllMessages")]
        public async Task<IActionResult> GetAllOrders(MessageParams messageParams)
        {
            var messages = await _repo.GetMessages(messageParams);
            Response.AddPagination(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);
            return Ok(messages);
        }

        [HttpDelete("deleteMessage/{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var messageInDb = await _repo.GetMessageById(id);
            messageInDb.IsDeleted = true;
            await _uow.Complete();
            return Ok();
        }
    }
}