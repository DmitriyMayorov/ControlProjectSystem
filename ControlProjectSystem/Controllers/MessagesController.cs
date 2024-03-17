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
    public class MessagesController : ControllerBase
    {
        public readonly IMessageService _messageService;

        public MessagesController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> Get()
        {
            return await Task.Run(() => _messageService.GetMessages());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MessageDTO>> Get(int id)
        {
            return await Task.Run(() => _messageService.GetMessage(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageDTO>> Post(MessageDTO value)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await Task.Run(() => _messageService.CreateMessage(new MessageDTO {TextMessage = value.TextMessage, DateMessage = value.DateMessage, IDTask = value.IDTask, IDWorker = value.IDWorker }));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MessageDTO>> Put(int id, MessageDTO value)
        {
            await Task.Run(() => _messageService.UpdateMessage(value));
            return CreatedAtAction("Get", new { Id = value.Id }, value);
        }

        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            await Task.Run(() => _messageService.DeleteMessage(id));
        }
    }
}
