using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel;
using Interfaces.Repository;

namespace DataAccess.RepositoryPostgreSQL
{
    public class TaskRepositoryPgs : IRepository<DomainModel.Task>
    {
        private ControlProjectSystemContext db;

        public TaskRepositoryPgs(ControlProjectSystemContext db)
        {
            this.db = db;
        }

        public List<DomainModel.Task> GetList()
        {
            return db.Tasks.ToList();
        }

        public DomainModel.Task? GetItem(int id)
        {
            return db.Tasks.Find(id);
        }

        public void Create(DomainModel.Task task)
        {
            db.Tasks.Add(task);
        }

        public void Update(DomainModel.Task task)
        {
            db.Entry(task).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            DomainModel.Task? tk = db.Tasks.Find(id);
            if (tk != null)
            {
                db.Tasks.Remove(tk);
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
