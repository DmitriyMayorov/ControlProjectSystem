using BusinesLogic.Service;
using Interfaces.DTO;
using Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ControlProjectSystem.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class WorkersController : ControllerBase
    {

        public readonly IWorkerService _workerService;

        public WorkersController(IWorkerService workerService)
        {
            _workerService = workerService;
        }

        [HttpGet]
        [Authorize(Roles = "Analyst, Coder, Tester")]
        public  async Task<ActionResult<IEnumerable<WorkerDTO>>> Get()
        {
            return await Task.Run(() =>  _workerService.GetWorkers());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Analyst, Coder, Tester")]
        public async Task<ActionResult<WorkerDTO>> Get(int id)
        {
            return await Task.Run(() => _workerService.GetWorker(id));
        }

        [HttpPost]
        [Authorize(Roles = "Analyst")]
        public async Task<ActionResult<WorkerDTO>> Post(WorkerDTO value)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await Task.Run(() => _workerService.CreateWorker(new WorkerDTO { Person = value.Person, PassportNum = value.PassportNum, PassportSeries = value.PassportSeries, Position = value.Position }));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Analyst")]
        public async Task<ActionResult<WorkerDTO>> Put(int id, WorkerDTO value)
        {
            await Task.Run(() => _workerService.UpdateWorker(value));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Analyst")]
        public async void Delete(int id)
        {
            await Task.Run(() => _workerService.DeleteWorker(id));
        }
    }
}
