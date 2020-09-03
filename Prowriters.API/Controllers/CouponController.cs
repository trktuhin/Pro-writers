using System;
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
    public class CouponController: ControllerBase
    {
        private readonly IProwritersRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;
        public CouponController(IProwritersRepository repo, IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost("AddCoupon")]
        public async Task<IActionResult> AddOrder(CouponCreationDto dto)
        {
            var couponToCreate = _mapper.Map<Coupon>(dto);
            couponToCreate.DateCreated = DateTime.Now;
            _repo.Add(couponToCreate);
            await _uow.Complete();
            return Ok(couponToCreate.Id);
        }

        [HttpGet("ApplyCoupon/{couponValue}")]
        public async Task<IActionResult> ApplyCoupon(string couponValue)
        {
            var couponFromRepo = await _repo.GetCouponByValue(couponValue);
            if(couponFromRepo == null)
                return BadRequest("Not a valid coupon");
            if(couponFromRepo.IsDeleted)
                return BadRequest("Not a valid coupon");
            return Ok(couponFromRepo);
        }
    }
}