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
    public class TrackService : ITrackService
    {
        private IDbRepos db;
        public TrackService(IDbRepos db)
        {
            this.db = db;
        }

        public bool SaveChanges()
        {
            return (db.Save() > 0) ? true : false;
        }

        public List<TrackDTO> GetTracks()
        {
            return db.Tracks.GetList().Select(i => new TrackDTO(i)).ToList();
        }

        public TrackDTO GetTrack(int id)
        {
            return new TrackDTO(db.Tracks.GetItem(id));
        }

        public int CreateTrack(TrackDTO track)
        {
            //0 - код ошибки - ошибки нет
            //1 - код ошибки - ошибка статуса. Нельзя добавлять время для выполненного задания
            //2 - код ошибки - ошибка зафиксированного времени. Нельзя добавлять время меньше либо равному 0 или времени, суммарно зартеканному за день больше 8
            if (track.StatusTask == "Ready")
                return 1;
            if (track.CountHours <= 0 || (GetSumHours(track.IDTask, track.StatusTask) + track.CountHours) > 8)
                return 2;

            db.Tracks.Create(new Track()
            {
                CountHours = track.CountHours,
                DateTrack = track.DateTrack,
                Idtask = track.IDTask,
                Idworker = track.IDWorker,
                StatusTask = track.StatusTask
            });
            SaveChanges();

            return 0;
        }

        public void UpdateTrack(TrackDTO track)
        {
            Track? tr = db.Tracks.GetItem(track.Id);
            if (tr == null)
                return;
            tr.CountHours = track.CountHours;
            tr.DateTrack = track.DateTrack;
            tr.Idworker = track.IDWorker;
            tr.Idtask = track.IDTask;
            tr.StatusTask = track.StatusTask;
            SaveChanges();
        }

        public void DeleteTrack(int id)
        {
            db.Tracks.Delete(id);
            SaveChanges();
        }

        public int GetSumHours(int idTask, string status)
        {
            return db.Tracks.GetList().Where(i => i.Idtask == idTask && i.StatusTask == status).Sum(i => i.CountHours);
        }

        public bool isShouldCreateTask(TrackDTO track, string status)
        {
            if (status == "Coder" && track.StatusTask != "InProgress" && track.StatusTask != "Stage" && track.StatusTask != "Review")
                return false;
            if (status == "Tester" && track.StatusTask != "Test")
                return false;
            return true;
        }
    }
}
