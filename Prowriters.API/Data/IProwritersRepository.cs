using System.Collections.Generic;

namespace Prowriters.API.Data
{
    public interface IProwritersRepository
    {
         void Add<T>(T entity) where T:class;
         void AddMultiple<T>(IEnumerable<T> entities) where T:class;
         void Delete<T>(T entity) where T:class;
         void RemoveMultiple<T>(IEnumerable<T> entities) where T:class;
    }
}