using Interfaces.Repository;
using DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.RepositoryPostgreSQL
{
    public class TrackRepositoryPgs : IRepository<Track>
    {
        private ControlProjectSystemContext db;

        public TrackRepositoryPgs(ControlProjectSystemContext db)
        {
            this.db = db;
        }

        public List<Track> GetList()
        {
            return db.Tracks.ToList();
        }

        public Track? GetItem(int id)
        {
            return db.Tracks.Find(id);
        }

        public void Create(Track track)
        {
            db.Tracks.Add(track);
        }

        public void Update(Track track)
        {
            db.Entry(track).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Track? tk = db.Tracks.Find(id);
            if (tk != null)
            {
                db.Tracks.Remove(tk);
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
