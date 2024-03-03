using DomainModel;
using Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.RepositoryPostgreSQL
{
    public class WorkerRepositoryPgs : IRepository<Worker>
    {
        private ControlProjectSystemContext db;

        public WorkerRepositoryPgs(ControlProjectSystemContext db)
        {
            this.db = db;
        }

        public List<Worker> GetList()
        {
            return db.Workers.ToList();
        }

        public Worker? GetItem(int id)
        {
            return db.Workers.Find(id);
        }

        public void Create(Worker worker)
        {
            db.Workers.Add(worker);
        }

        public void Update(Worker worker)
        {
            db.Entry(worker).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Worker? wk = db.Workers.Find(id);
            if (wk != null)
            {
                db.Workers.Remove(wk);
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
