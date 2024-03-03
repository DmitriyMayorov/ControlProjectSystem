using DomainModel;
using Interfaces.DTO;
using Interfaces.Repository;
using Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinesLogic.Service
{
    public class MessageService : IMessageService
    {
        private IDbRepos db;
        public MessageService(IDbRepos db)
        {
            this.db = db;
        }

        public bool SaveChanges()
        {
            return (db.Save() > 0) ? true : false;
        }

        public List<MessageDTO> GetMessages()
        {
            return db.Messages.GetList().Select(i => new MessageDTO(i)).ToList();
        }

        public MessageDTO GetMessage(int id)
        {
            return new MessageDTO(db.Messages.GetItem(id));
        }

        public void CreateMessage(MessageDTO message)
        {
            db.Messages.Create(new Message()
            {
                TextMessage = message.TextMessage,
                DateMessage = message.DateMessage,
                Idtask = message.IDTask,
                Idworker = message.IDWorker
            });
            SaveChanges();
        }

        public void UpdateMessage(MessageDTO message)
        {
            Message? mess = db.Messages.GetItem(message.Id);
            if (mess == null)
                return;
            mess.TextMessage = message.TextMessage;
            mess.DateMessage = message.DateMessage;
            mess.Idtask = message.IDTask;
            mess.Idworker = message.IDWorker;
            SaveChanges();
        }

        public void DeleteMessage(int id)
        {
            db.Messages.Delete(id);
            SaveChanges();
        }

        public List<MessageDTO> GetMessagesForCurrentTask(int taskId)
        {
            return db.Messages.GetList().Where(i => i.Idtask == taskId).Select(i => new MessageDTO(i)).ToList();
        }
    }
}
