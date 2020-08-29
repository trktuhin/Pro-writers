using Microsoft.EntityFrameworkCore;
using Prowriters.API.Models;

namespace Prowriters.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){}

        public DbSet<Coupon> Coupons { get; set; }
    }
}