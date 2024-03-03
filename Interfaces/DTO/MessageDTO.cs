using DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.DTO
{
    public class MessageDTO
    {
        public int Id { get; set; }

        public string TextMessage { get; set; } = null!;

        public DateOnly DateMessage { get; set; }

        public int IDTask { get; set; }

        public int IDWorker { get; set; }

        public MessageDTO() { }

        public MessageDTO(Message mess)
        {
            Id = mess.Id;
            TextMessage = mess.TextMessage;
            DateMessage = mess.DateMessage;
            IDWorker = mess.Idworker;
            IDTask = mess.Idtask;
        }
    }
}
