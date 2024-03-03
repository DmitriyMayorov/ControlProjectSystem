using Interfaces.Services;
using Interfaces.DTO;
using Microsoft.AspNetCore.Mvc;


namespace ControlProjectSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        public readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
            if (!_projectService.GetProjects().Any())
            {
                _projectService.CreateProject(new ProjectDTO() 
                { 
                    Name = "FirstProject", 
                    DeadLine = DateOnly.MaxValue
                });
            }
        }

        // GET: api/<ProjectsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> Get()
        {
            return await Task.Run(() => _projectService.GetProjects());
        }

        // GET api/<ProjectsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDTO>> Get(int id)
        {
            return await Task.Run(() => _projectService.GetProject(id));
        }

        // POST api/<ProjectsController>
        [HttpPost]
        public async Task<ActionResult<ProjectDTO>> Post(ProjectDTO value)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await Task.Run(() => _projectService.CreateProject(new ProjectDTO { Name = value.Name, DeadLine = value.DeadLine }));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        // PUT api/<ProjectsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDTO>> Put(ProjectDTO value)
        {
            await Task.Run(() => _projectService.UpdateProject(value));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        // DELETE api/<ProjectsController>/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            await Task.Run(() => _projectService.DeleteProject(id));
        }
    }
}
