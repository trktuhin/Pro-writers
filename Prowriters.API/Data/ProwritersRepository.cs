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
    }
}