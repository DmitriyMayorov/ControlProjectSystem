using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel;
namespace Interfaces.Repository
{
    public interface IDbRepos
    {
        IRepository<Project> Projects { get; }
        IRepository<DomainModel.Task> Tasks { get; }
        IRepository<Worker> Workers { get; }
        IRepository<Track> Tracks { get; }
        IRepository<Message> Messages { get; }
        int Save();
    }
}
