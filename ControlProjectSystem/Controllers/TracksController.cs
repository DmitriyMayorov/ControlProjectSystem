using BusinesLogic.Service;
using Interfaces.DTO;
using Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ControlProjectSystem.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class TracksController : ControllerBase
    {
        public readonly ITrackService _trackService;

        public TracksController(ITrackService trackService)
        {
            _trackService = trackService;
        }

        [HttpGet]
        [Authorize(Roles = "Analyst, Coder, Tester")]
        public async Task<ActionResult<IEnumerable<TrackDTO>>> Get()
        {
            return await Task.Run(() => _trackService.GetTracks());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Analyst, Coder, Tester")]
        public async Task<ActionResult<TrackDTO>> Get(int id)
        {
            return await Task.Run(() => _trackService.GetTrack(id)); ;
        }

        [HttpPost]
        [Authorize(Roles = "Analyst, Coder, Tester")]
        public async Task<ActionResult<TrackDTO>> Post(TrackDTO value)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await Task.Run(() => _trackService.CreateTrack(new TrackDTO { CountHours = value.CountHours, DateTrack = value.DateTrack,
                                                                            IDTask = value.IDTask, IDWorker = value.IDWorker, StatusTask = value.StatusTask}));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Analyst, Coder, Tester")]
        public async Task<ActionResult<TrackDTO>> Put(int id, TrackDTO value)
        {
            await Task.Run(() => _trackService.UpdateTrack(value));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Analyst, Coder, Tester")]
        public async void Delete(int id)
        {
            await Task.Run(() => _trackService.DeleteTrack(id));
        }
    }
}
