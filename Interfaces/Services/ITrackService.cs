using Interfaces.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.Services
{
    public interface ITrackService
    {
        List<TrackDTO> GetTracks();
        TrackDTO GetTrack(int id);

        bool isShouldCreateTask(TrackDTO track, string status);

        int CreateTrack(TrackDTO track);
        void UpdateTrack(TrackDTO track);
        void DeleteTrack(int id);

        int GetSumHours(int idTask, string status);
    }
}
