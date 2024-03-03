﻿using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ControlProjectSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TracksController : ControllerBase
    {
        public readonly ITrackService _trackService;

        public TracksController(ITrackService trackService)
        {
            _trackService = trackService;
        }

        // GET: api/<TracksController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<TracksController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TracksController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TracksController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TracksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
