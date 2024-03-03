using DomainModel;
using Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.RepositoryPostgreSQL
{
    public class DbReposPgs : IDbRepos
    {
        private ControlProjectSystemContext db;
        private MessageRepositoryPgs? MessageRepositoryPgs;
        private ProjectRepositoryPgs? ProjectRepositoryPgs;
        private TaskRepositoryPgs? TaskRepositoryPgs;
        private TrackRepositoryPgs? TrackRepositoryPgs;
        private WorkerRepositoryPgs? WorkerRepositoryPgs;

        public DbReposPgs()
        {
            db = new ControlProjectSystemContext();
        }

        public IRepository<Project> Projects
        {
            get
            {
                if (ProjectRepositoryPgs == null)
                    ProjectRepositoryPgs = new ProjectRepositoryPgs(db);
                return ProjectRepositoryPgs;
            }
        }

        public IRepository<DomainModel.Task> Tasks
        {
            get
            {
                if (TaskRepositoryPgs == null)
                    TaskRepositoryPgs = new TaskRepositoryPgs(db);
                return TaskRepositoryPgs;
            }
        }

        public IRepository<Worker> Workers
        {
            get
            {
                if (WorkerRepositoryPgs == null)
                    WorkerRepositoryPgs = new WorkerRepositoryPgs(db);
                return WorkerRepositoryPgs;
            }
        }

        public IRepository<Track> Tracks
        {
            get
            {
                if (TrackRepositoryPgs == null)
                    TrackRepositoryPgs = new TrackRepositoryPgs(db);
                return TrackRepositoryPgs;
            }
        }

        public IRepository<Message> Messages
        {
            get
            {
                if (MessageRepositoryPgs == null)
                    MessageRepositoryPgs = new MessageRepositoryPgs(db);
                return MessageRepositoryPgs;
            }
        }

        public int Save()
        {
            return db.SaveChanges();
        }
    }
}
