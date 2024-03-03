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
    public class MessageRepositoryPgs : IRepository<Message>
    {
        private ControlProjectSystemContext db;

        public MessageRepositoryPgs(ControlProjectSystemContext db)
        {
            this.db = db;
        }

        public List<Message> GetList()
        {
            return db.Messages.ToList();
        }

        public Message? GetItem(int id)
        {
            return db.Messages.Find(id);
        }

        public void Create(Message message)
        {
            db.Messages.Add(message);
        }

        public void Update(Message message)
        {
            db.Entry(message).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Message? ms = db.Messages.Find(id);
            if (ms != null)
            {
                db.Messages.Remove(ms);
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
