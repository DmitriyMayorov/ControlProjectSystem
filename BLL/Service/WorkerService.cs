using DomainModel;
using Interfaces.DTO;
using Interfaces.Repository;
using Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinesLogic.Service
{
    public class WorkerService : IWorkerService
    {
        private IDbRepos db;
        public WorkerService(IDbRepos db)
        {
            this.db = db;
        }

        public bool SaveChanges()
        {
            return (db.Save() > 0) ? true : false;
        }

        public List<WorkerDTO> GetWorkers()
        {
            return db.Workers.GetList().Select(i => new WorkerDTO(i)).ToList();
        }

        public List<WorkerDTO> GetAnalysts()
        {
            return db.Workers.GetList().Where(i => i.Position == "Аналитик").ToList()
                    .Select(i => new WorkerDTO(i)).ToList();
        }

        public List<WorkerDTO> GetCoders()
        {
            return db.Workers.GetList().Where(i => i.Position == "Аналитик").ToList()
                    .Select(i => new WorkerDTO(i)).ToList();
        }

        public List<WorkerDTO> GetTesters()
        {
            return db.Workers.GetList().Where(i => i.Position == "Аналитик").ToList()
                    .Select(i => new WorkerDTO(i)).ToList();
        }

        public WorkerDTO GetWorker(int id)
        {
            return new WorkerDTO(db.Workers.GetItem(id));
        }

        public void CreateWorker(WorkerDTO worker)
        {
            db.Workers.Create(new Worker()
            {
                Person = worker.Person,
                PassportNum = worker.PassportNum,
                PassportSeries = worker.PassportSeries,
                Position = worker.Position
            });
            SaveChanges();

        }

        public void UpdateWorker(WorkerDTO worker)
        {
            Worker? wk = db.Workers.GetItem(worker.Id);
            if (wk == null)
                return;
            wk.PassportNum = worker.PassportNum;
            wk.PassportSeries = worker.PassportSeries;
            wk.Person = worker.Person;
            db.Workers.Update(wk);
            SaveChanges();
        }

        public void DeleteWorker(int id)
        {
            db.Workers.Delete(id);
            SaveChanges();
        }
    }
}
