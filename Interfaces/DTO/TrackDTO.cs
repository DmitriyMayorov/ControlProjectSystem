using DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.DTO
{
    public class TrackDTO
    {
        public int Id { get; set; }

        public int IDTask { get; set; }

        public DateOnly DateTrack { get; set; }

        public int CountHours { get; set; }

        public int IDWorker { get; set; }

        public string StatusTask { get; set; } = null!;

        public TrackDTO() { }

        public TrackDTO(Track tr)
        {
            Id = tr.Id;
            IDTask = tr.Idtask;
            DateTrack = tr.DateTrack;
            CountHours = tr.CountHours;
            IDWorker = tr.Idworker;
            StatusTask = tr.StatusTask;
        }
    }
}
