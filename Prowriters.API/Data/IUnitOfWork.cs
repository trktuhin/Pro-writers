using System.Threading.Tasks;

namespace Prowriters.API.Data
{
    public interface IUnitOfWork
    {
         Task Complete();
    }
}