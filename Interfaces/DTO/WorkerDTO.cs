using DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.DTO
{
    public class WorkerDTO
    {
        public int Id { get; set; }

        public string Person { get; set; } = null!;

        public int PassportNum { get; set; } 

        public int PassportSeries { get; set; }

        public string Position { get; set; } = null!;

        public WorkerDTO() { }

        public WorkerDTO(Worker wk)
        {
            Id = wk.Id;
            Person = wk.Person;
            PassportNum = wk.PassportNum;
            PassportSeries = wk.PassportSeries;
            Position = wk.Position;
        }
    }
}
