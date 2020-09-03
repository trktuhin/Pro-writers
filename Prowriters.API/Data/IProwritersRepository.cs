using System.Collections.Generic;
using System.Threading.Tasks;
using Prowriters.API.Models;

namespace Prowriters.API.Data
{
    public interface IProwritersRepository
    {
         void Add<T>(T entity) where T:class;
         void AddMultiple<T>(IEnumerable<T> entities) where T:class;
         void Delete<T>(T entity) where T:class;
         void RemoveMultiple<T>(IEnumerable<T> entities) where T:class;
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
         Task<Order> GetOrderById(int id);
         Task<IEnumerable<Order>> GetOrders();
         Task<Message> GetMessageById(int id);
         Task<IEnumerable<Message>> GetMessages();
         Task<Coupon> GetCouponById(int id);
         Task<Coupon> GetCouponByValue(string value);
         Task<IEnumerable<Coupon>> GetCoupons();
    }
}