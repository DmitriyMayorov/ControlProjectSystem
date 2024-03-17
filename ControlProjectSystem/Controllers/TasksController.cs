using BusinesLogic.Service;
using Interfaces.DTO;
using Interfaces.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ControlProjectSystem.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class TasksController : ControllerBase
    {
        public readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> Get()
        {
            return await Task.Run(() => _taskService.GetTasks());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDTO>> Get(int id)
        {
            return await Task.Run(() => _taskService.GetTask(id));
        }

        [HttpPost]
        public async Task<ActionResult<TaskDTO>> Post(TaskDTO value)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await Task.Run(() => _taskService.CreateTask(new TaskDTO { Name = value.Name, Description = value.Description, IDWorkerAnalyst = value.IDWorkerAnalyst,
                                                                        IDWorkerCoder = value.IDWorkerCoder, IDWorkerCreater = value.IDWorkerCreater, IDWorkerMentor = value.IDWorkerMentor,
                                                                        IDWorkerTester = value.IDWorkerTester, IDProject = value.IDProject, Category = value.Category, State = value.State ,
                                                                        Priority = value.Priority, Deadline = value.Deadline }));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TaskDTO>> Put(int id, TaskDTO value)
        {
            await Task.Run(() => _taskService.UpdateTask(value));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            await Task.Run(() => _taskService.DeleteTask(id));
        }
    }
}
