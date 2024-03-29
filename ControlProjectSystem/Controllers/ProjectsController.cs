﻿using Interfaces.Services;
using Interfaces.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;


namespace ControlProjectSystem.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> Get()
        {
            return await Task.Run(() => _projectService.GetProjects());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDTO>> Get(int id)
        {
            return await Task.Run(() => _projectService.GetProject(id));
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDTO>> Post(ProjectDTO value)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await Task.Run(() => _projectService.CreateProject(new ProjectDTO { Name = value.Name, DeadLine = value.DeadLine }));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDTO>> Put(ProjectDTO value)
        {
            await Task.Run(() => _projectService.UpdateProject(value));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            await Task.Run(() => _projectService.DeleteProject(id));
        }
    }
}
