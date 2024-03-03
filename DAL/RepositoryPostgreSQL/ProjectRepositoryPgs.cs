using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel;
using Interfaces.Repository;

namespace DataAccess.RepositoryPostgreSQL
{
    public class ProjectRepositoryPgs : IRepository<Project>
    {
        private ControlProjectSystemContext db;

        public ProjectRepositoryPgs(ControlProjectSystemContext db)
        {
            this.db = db;
        }

        public List<Project> GetList()
        {
            return db.Projects.ToList();
        }

        public Project? GetItem(int id)
        {
            return db.Projects.Find(id);
        }

        public void Create(Project item)
        {
            db.Projects.Add(item);
        }

        public void Update(Project item)
        {
            db.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }

        public void Delete(int id)
        {
            Project? temp = db.Projects.Find(id);
            if (temp != null)
            {
                db.Projects.Remove(temp);
                Save();
            }
            else
                throw new NotImplementedException();
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
