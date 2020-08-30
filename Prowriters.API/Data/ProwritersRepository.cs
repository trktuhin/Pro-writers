using System.Collections.Generic;

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
    }
}