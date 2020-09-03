using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Prowriters.API.Models;

namespace Prowriters.API.Data
{
    public class ProwritersRepository : IProwritersRepository
    {
        private readonly DataContext _context;
        public ProwritersRepository(DataContext context)
        {
            _context = context;

        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void RemoveMultiple<T>(IEnumerable<T> entities) where T : class
        {
            _context.RemoveRange(entities);
        }

        public void AddMultiple<T>(IEnumerable<T> entities) where T : class
        {
            _context.AddRange(entities);
        }

        public async Task<Order> GetOrderById(int id)
        {
            return await _context.Orders.FirstOrDefaultAsync(order => order.Id == id);
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            return await _context.Orders.OrderByDescending(or => or.OrderDate).ToListAsync();
        }

        public async Task<Message> GetMessageById(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(message => message.Id == id);
        }

        public async Task<IEnumerable<Message>> GetMessages()
        {
            return await _context.Messages.OrderByDescending(message => message.MessageDate).ToListAsync();
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);
            if (user == null)
                return null;
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;
            return user;
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Username == username))
                return true;
            return false;
        }

        public async Task<Coupon> GetCouponById(int id)
        {
            return await _context.Coupons.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Coupon> GetCouponByValue(string value)
        {
            return await _context.Coupons.FirstOrDefaultAsync(x => x.CouponValue == value);
        }


        public async Task<IEnumerable<Coupon>> GetCoupons()
        {
            return await _context.Coupons.OrderByDescending(x => x.DateCreated).ToListAsync();
        }
    }
}